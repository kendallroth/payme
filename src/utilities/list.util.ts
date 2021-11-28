/**
 * Extractor for Flat List keys
 *
 * @param   item - Flat list item
 * @returns Item key
 */
const flatListIdExtractor = (item: any): string => item.id;

export { flatListIdExtractor };
