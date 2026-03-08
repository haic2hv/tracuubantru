/**
 * Mapping for Vietnamese characters to their base form
 * Handles all tone marks and regional variants
 */
const VIETNAMESE_CHAR_MAP: { [key: string]: string } = {
  // Uppercase A variants
  'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
  'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
  'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
  // Lowercase a variants
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  // Uppercase E variants
  'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
  'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
  // Lowercase e variants
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  // Uppercase I variants
  'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
  // Lowercase i variants
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  // Uppercase O variants
  'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
  'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
  'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
  // Lowercase o variants
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  // Uppercase U variants
  'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
  'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
  // Lowercase u variants
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  // Uppercase Y variants
  'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
  // Lowercase y variants
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
  // D with stroke
  'Đ': 'D', 'đ': 'd'
};

/**
 * Normalize Vietnamese characters to handle typos and variations
 * Maps similar-looking Vietnamese characters to reduce matching issues
 * Example: 'oà' (incorrect tone) -> 'oa' (normalized)
 */
const VIETNAMESE_TYPO_MAP: { [key: string]: string } = {
  // Common typing errors with Vietnamese tone marks
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
  'đ': 'd'
};

/**
 * Remove Vietnamese diacritics from a string
 * Example: "Vĩ Văn Khánh" -> "Vi Van Khanh"
 */
export function removeDiacritics(str: string): string {
  if (!str) return "";
  
  return str
    .split('')
    .map(char => VIETNAMESE_CHAR_MAP[char] || char)
    .join('');
}

/**
 * Normalize Vietnamese text for fuzzy matching
 * Removes diacritics and handles common typos
 * Example: "Thuỳ" -> "thuy", "Oà" -> "oa"
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return "";
  
  return removeDiacritics(str)
    .toLowerCase()
    .trim();
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos
 * Returns the minimum number of edits needed
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Check if search term matches text with fuzzy matching
 * Supports:
 * - Exact matches (best score)
 * - Partial substring matches
 * - Typos within tolerance
 * Returns match score (1.0 = perfect match, 0 = no match)
 */
export function isFuzzyMatch(text: string, searchTerm: string, maxDistance: number = 1): boolean {
  if (!text || !searchTerm) return false;

  const normalizedText = normalizeVietnamese(text);
  const normalizedSearch = normalizeVietnamese(searchTerm);

  // Exact substring match (best)
  if (normalizedText.includes(normalizedSearch)) {
    return true;
  }

  // Word-level matching (search term matches individual words)
  const words = normalizedText.split(/\s+/);
  for (const word of words) {
    if (word.includes(normalizedSearch)) {
      return true;
    }
    
    // Fuzzy match on individual words with typo tolerance
    const distance = levenshteinDistance(word, normalizedSearch);
    if (distance <= maxDistance && normalizedSearch.length > 0) {
      // Only allow fuzzy match if search term is sufficiently long
      if (normalizedSearch.length >= 2 && distance / normalizedSearch.length <= 0.3) {
        return true;
      }
    }
  }

  // Check if any word starts with search term (prefix match)
  for (const word of words) {
    if (word.startsWith(normalizedSearch)) {
      return true;
    }
  }

  // Fuzzy match entire text for very short searches
  if (normalizedSearch.length <= 2) {
    return false; // Don't fuzzy match very short terms
  }

  const textDistance = levenshteinDistance(normalizedText, normalizedSearch);
  return textDistance <= maxDistance;
}

/**
 * Generate transfer content (nội dung chuyển khoản)
 * Format: "[Name Without Diacritics] [Class]"
 * Example: "Vi Van Khanh 6A"
 */
export function generateTransferContent(name: string, className: string): string {
  const nameWithoutDiacritics = removeDiacritics(name).toUpperCase();
  return `${nameWithoutDiacritics} ${className}`.trim();
}

/**
 * Format currency in Vietnamese format
 * Example: 480000 -> "480,000 đ"
 */
export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  if (isNaN(num)) return '0 đ';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
}

/**
 * Parse numeric value from string (handles various formats)
 */
export function parseNumeric(value: string | number): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^\d-]/g, '');
    return parseInt(cleaned, 10) || 0;
  }
  return 0;
}
