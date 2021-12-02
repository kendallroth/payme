export interface IPerson {
  id: string;
  /** When person was archived */
  archivedAt: string | null;
  /** When person was created */
  createdAt: string;
  /** Person's name */
  name: string;
}
