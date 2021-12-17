import { IPersonBase } from "./people.types";

/** Event/person attendance association */
export interface IEventAttendance {
  /**
   * Combination of event and person IDs
   *
   * @example "eventId:personId"
   */
  id: string;
  /** ID of event */
  eventId: string;
  /** ID of person */
  personId: string;
  /** When event was paid for */
  paidAt: string | null;
}

/** Person's relationship to an event */
export interface IPersonForEvent extends IPersonBase {
  /** Whether person is attending the event */
  attending: boolean;
  /** When person paid for the event */
  paidAt: string | null;
}

/** Attendance person toggle action */
export interface IAttendanceTogglePerson {
  /** Whether person is attending */
  attending: boolean;
  /** ID of event */
  eventId: string;
  /** ID of person */
  personId: string;
}

/** Attendance payment toggle action */
export interface IAttendanceTogglePayment {
  /** ID of event */
  eventId: string;
  /** Whether attendance has been paid */
  paid: boolean;
  /** ID of person */
  personId: string;
}
