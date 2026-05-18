/**
 * Utility functions for text processing
 */

/**
 * Decodes HTML entities in a string
 * @param html The string containing HTML entities
 * @returns Decoded string
 */
export const decodeHTML = (html: string): string => {
  if (!html) return '';
  
  // Fix common mis-encoded numeric entities (missing #)
  let processed = html.replace(/&(\d+);/g, '&#$1;');
  
  const txt = document.createElement('textarea');
  txt.innerHTML = processed;
  return txt.value;
};

/**
 * Strips basic markdown symbols from a string and cleans up the text
 */
export const stripMarkdown = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/^#+\s/gm, '')      // Remove # headings
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold **text**
    .replace(/\*(.*?)\*/g, '$1')      // Remove italic *text*
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Convert [text](url) to text
    .replace(/^\s*-\s+/gm, '') // Strip list dashes
    .trim();
};

/**
 * Processes article text by decoding HTML and stripping markdown
 * @param text The raw text from API
 * @returns Cleaned text
 */
export const cleanArticleText = (text: string): string => {
  return decodeHTML(stripMarkdown(text));
};
