import { services as staticServices } from '../data/servicesData';

/**
 * Supported asset types for resolution
 */
export type AssetType = 'service' | 'client' | 'logo' | 'hero' | 'other';

/**
 * Resolves an asset path to a full URL with environment-aware logging and type safety.
 * 
 * @param path - The incoming path or filename
 * @param idOrContext - A unique ID for static lookup or a context name for logging
 * @param type - The category of the asset
 */
export const resolveAssetPath = (
  path: string | undefined, 
  idOrContext: string, 
  type: AssetType = 'service'
): string => {
  let resolvedPath = '';

  // 1. Handle missing paths by looking up in static fallbacks
  if (!path) {
    if (type === 'service') {
      const staticService = staticServices.find(s => s.id === idOrContext);
      resolvedPath = staticService?.image || '';
    }
  } else if (path.startsWith('http')) {
    // 2. Already a full URL
    resolvedPath = path;
  } else {
    // 3. Normalize relative path
    const normalized = path.startsWith('/') ? path : `/${path}`;

    // Handle root-level assets
    const rootAssets = ['/logo.png', '/hero-video.mp4', '/robots.txt'];
    if (rootAssets.includes(normalized)) {
      resolvedPath = normalized;
    } else if (!normalized.startsWith('/images/')) {
      // Prepend /images/ if missing
      // If it looks like just a filename (no extension), assume .jpg
      if (!normalized.includes('.')) {
        resolvedPath = `/images${normalized}.jpg`;
      } else {
        resolvedPath = `/images${normalized}`;
      }
    } else {
      resolvedPath = normalized;
    }
  }

  // Debug logging in development mode
  if (import.meta.env.DEV) {
    console.debug(`[AssetResolver] ${type} (${idOrContext}): ${path} -> ${resolvedPath}`);
  }

  return resolvedPath;
};

/**
 * Alias for resolveAssetPath to maintain backward compatibility
 */
export const resolveServiceImage = resolveAssetPath;

/**
 * Placeholder for future image optimization logic (e.g., Vercel Image Optimization or Cloudinary)
 */
export const getOptimizedImage = (
  path: string,
  _size: 'thumbnail' | 'medium' | 'full' = 'medium'
): string => {
  // For now, return as is. In the future, this can append query params like ?w=400&q=75
  return path;
};
