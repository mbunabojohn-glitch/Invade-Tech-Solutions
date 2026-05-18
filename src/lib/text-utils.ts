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
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Strips basic markdown symbols from a string
 * @param text The string containing markdown
 * @returns Clean text
 */
export const stripMarkdown = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[#*`_~]/g, '') // Strip symbols like #, *, `, _, ~
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Convert [text](url) to text
    .replace(/^\s*-\s+/gm, '') // Strip list dashes
    .replace(/\n{2,}/g, '\n\n') // Normalize multiple newlines
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
