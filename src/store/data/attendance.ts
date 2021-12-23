import dayjs from "dayjs";

// Utilities
import { DATE_FORMAT_ISO_SHORT } from "@utilities/date.util";
import { fakeEvents } from "./events";
import { fakePeople } from "./people";

// Types
import { IEventAttendance } from "@typings/attendance.types";

/**
 * Create a fake attendance record
 *
 * @param   eventId  - Event ID
 * @param   personId - Attendee ID
 * @param   paidAt   - When event was paid for
 * @returns Fake attendance
 */
const createFakeAttendance = (
  eventId: string,
  personId: string,
  paidAt: string | null,
): IEventAttendance => {
  return {
    eventId,
    id: `${eventId}:${personId}`,
    paidAt,
    personId,
  };
};

/**
 * Create a fake past date
 *
 * @param   daysPast - How many days in the past the date should be
 * @returns Fake past date
 */
const createFakeDate = (daysPast: number): string =>
  dayjs().subtract(daysPast, "day").format(DATE_FORMAT_ISO_SHORT);

// NOTE: Static exports are only calculated once when app loads!
const fakeAttendance: IEventAttendance[] = [
  // Completely paid event (past)
  createFakeAttendance(fakeEvents[0].id, fakePeople[0].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[2].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[3].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[4].id, createFakeDate(3)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[6].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[8].id, createFakeDate(3)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[10].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[12].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[13].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[14].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[15].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[0].id, fakePeople[17].id, createFakeDate(2)),

  // Partially paid event (past)
  createFakeAttendance(fakeEvents[1].id, fakePeople[2].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[1].id, fakePeople[3].id, null),
  createFakeAttendance(fakeEvents[1].id, fakePeople[5].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[1].id, fakePeople[7].id, createFakeDate(3)),
  createFakeAttendance(fakeEvents[1].id, fakePeople[10].id, createFakeDate(4)),
  createFakeAttendance(fakeEvents[1].id, fakePeople[14].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[1].id, fakePeople[15].id, createFakeDate(2)),

  // Partially paid event (future)
  createFakeAttendance(fakeEvents[2].id, fakePeople[1].id, null),
  createFakeAttendance(fakeEvents[2].id, fakePeople[2].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[2].id, fakePeople[4].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[2].id, fakePeople[6].id, null),
  createFakeAttendance(fakeEvents[2].id, fakePeople[8].id, createFakeDate(3)),
  createFakeAttendance(fakeEvents[2].id, fakePeople[11].id, null),
  createFakeAttendance(fakeEvents[2].id, fakePeople[13].id, createFakeDate(2)),
  createFakeAttendance(fakeEvents[2].id, fakePeople[15].id, createFakeDate(1)),
  createFakeAttendance(fakeEvents[2].id, fakePeople[16].id, null),

  // Empty event (add no people!) (future)
];

export { createFakeAttendance, fakeAttendance };
