export function sanitizeText(value: unknown): string {
  if (!value) return "No data available";

  // Already clean text
  if (typeof value !== "string") {
    return String(value);
  }

  try {
    const parsed = JSON.parse(value);

    // If AI returned object with message
    if (parsed.message) {
      return parsed.message;
    }

    // Fallback stringify
    return JSON.stringify(parsed);
  } catch {
    // Remove accidental escaped characters
    return value
      .replace(/\\n/g, " ")
      .replace(/\\"/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  }
}

export function formatNextAction(action: unknown) {
  return sanitizeText(action);
}

export function formatSummary(summary: unknown) {
  return sanitizeText(summary);
}

export function formatOpeningMessage(message: unknown) {
  return sanitizeText(message);
}