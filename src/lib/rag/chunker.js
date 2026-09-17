/**
 * Chunker utility to split raw document text into overlapping chunks
 * Default chunk size: ~2000 characters (~500 tokens)
 * Default overlap: ~400 characters (~100 tokens)
 */
export function chunkText(text, chunkSize = 2000, overlap = 400) {
  if (!text || typeof text !== "string") return [];

  const cleanedText = text.replace(/\r\n/g, "\n").trim();
  if (!cleanedText) return [];

  if (cleanedText.length <= chunkSize) {
    return [cleanedText];
  }

  const chunks = [];
  let startIndex = 0;

  while (startIndex < cleanedText.length) {
    let endIndex = startIndex + chunkSize;

    if (endIndex >= cleanedText.length) {
      chunks.push(cleanedText.slice(startIndex).trim());
      break;
    }

    // Attempt to break cleanly at paragraph break or newline
    let breakPoint = cleanedText.lastIndexOf("\n\n", endIndex);
    if (breakPoint === -1 || breakPoint <= startIndex) {
      breakPoint = cleanedText.lastIndexOf("\n", endIndex);
    }
    if (breakPoint === -1 || breakPoint <= startIndex) {
      breakPoint = cleanedText.lastIndexOf(". ", endIndex);
    }
    if (breakPoint === -1 || breakPoint <= startIndex) {
      breakPoint = endIndex;
    } else {
      breakPoint += 1; // Include ending punctuation/newline
    }

    const chunk = cleanedText.slice(startIndex, breakPoint).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    // Move start index forward with overlap
    startIndex = Math.max(startIndex + 1, breakPoint - overlap);
  }

  return chunks;
}
