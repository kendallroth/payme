export interface IPerson extends IPersonBase {
  /** When person was created */
  createdAt: string;
}

/** Base properties for 'IPerson' (used when creating) */
export interface IPersonBase {
  id: string;
  /** Person's name */
  name: string;
}
