/**
 * Parses JSON from LLM response text that may be wrapped in markdown code fences
 * or contain unescaped control characters inside string values.
 */
export function parseLLMJson(raw: string): unknown {
  let str = raw.trim();
  if (!str) {
    throw new Error("Empty response");
  }

  // Strip markdown code block: ```json ... ``` or ``` ... ```
  if (str.startsWith("```")) {
    str = str.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "").trim();
  }

  // Sanitize control characters inside double-quoted string values only
  str = sanitizeJsonStringControlChars(str);

  return JSON.parse(str);
}

/**
 * Escapes control characters (0x00-0x1F) inside JSON string values so JSON.parse accepts them.
 * Walks character-by-character and only modifies content inside double-quoted strings,
 * respecting backslash-escaped characters.
 */
function sanitizeJsonStringControlChars(json: string): string {
  let result = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < json.length; i++) {
    const c = json[i];
    const code = c.charCodeAt(0);

    if (escaped) {
      result += c;
      escaped = false;
      continue;
    }

    if (c === '"') {
      result += c;
      inString = !inString;
      continue;
    }

    if (inString && c === "\\") {
      result += c;
      escaped = true;
      continue;
    }

    if (inString && code >= 0 && code <= 0x1f) {
      result += jsonEscapeControlChar(code);
      continue;
    }

    result += c;
  }

  return result;
}

function jsonEscapeControlChar(code: number): string {
  switch (code) {
    case 0x0a:
      return "\\n";
    case 0x0d:
      return "\\r";
    case 0x09:
      return "\\t";
    default:
      return "\\u" + code.toString(16).padStart(4, "0");
  }
}
