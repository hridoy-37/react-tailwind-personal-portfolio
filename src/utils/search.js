const normalize = (s) => s.trim().toLowerCase();

/** Case-insensitive substring match. An empty query matches everything. */
export const includesQuery = (text, query) => text.toLowerCase().includes(normalize(query));

/** True if every character of `query` appears in `text`, in order. */
const fuzzyMatch = (text, query) => {
  let i = 0;
  for (const ch of text) if (ch === query[i]) i++;
  return i === query.length;
};

/**
 * Filters `items` by `query`: exact substring hits win; if there are none,
 * falls back to a fuzzy (in-order characters) match.
 */
export const searchItems = (items, query, toText) => {
  const q = normalize(query);
  if (!q) return items;
  const texts = items.map((item) => toText(item).toLowerCase());
  const exact = items.filter((_, i) => texts[i].includes(q));
  return exact.length ? exact : items.filter((_, i) => fuzzyMatch(texts[i], q));
};
