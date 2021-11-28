/** Base event shape */
export interface IEventBase {
  id: string;
  /** Event date */
  date: string;
  /** Event name/title */
  title: string;
}

export interface IEvent extends IEventBase {
  /** Event cost */
  cost?: number;
  /** Event description */
  description?: string;
}

/** Separate events by time (future vs past) */
export interface IEventsByTime {
  /** Future events */
  futureEvents: IEvent[];
  /** Past events */
  pastEvents: IEvent[];
}
