import dayjs from "dayjs";
import { date as fakeDate } from "faker";
import { v4 as uuidv4 } from "uuid";

// Utilities
import { DATE_FORMAT_ISO_SHORT } from "@utilities/date.util";

// Types
import { IEvent } from "@typings/event.types";

type FakeEventNew = Pick<IEvent, "title" | "cost" | "date" | "stats">;

/**
 * Create a fake event
 *
 * @param   event - Partial details
 * @returns Fake event
 */
const createFakeEvent = (event: FakeEventNew): IEvent => {
  return {
    id: uuidv4(),
    archivedAt: null,
    createdAt: fakeDate.past(1).toISOString(),
    stats: {
      attending: 0,
      unpaid: 0,
    },
    ...event,
  };
};

// NOTE: Static exports are only calculated once when app loads!
//         Additionally, these values are used in fake attendance (caution)!
const fakeEvents: IEvent[] = [
  // Past events
  createFakeEvent({
    date: dayjs().subtract(5, "day").format(DATE_FORMAT_ISO_SHORT),
    title: "Pickup Hockey",
    cost: 10,
  }),
  createFakeEvent({
    date: dayjs().subtract(2, "day").format(DATE_FORMAT_ISO_SHORT),
    title: "Painting Class",
    cost: 25,
  }),
  // Future events
  createFakeEvent({
    date: dayjs().add(3, "day").format(DATE_FORMAT_ISO_SHORT),
    title: "Ice Skating",
    cost: undefined,
  }),
  createFakeEvent({
    date: dayjs().add(10, "day").format(DATE_FORMAT_ISO_SHORT),
    title: "Camping Trip",
    cost: 25,
  }),
];

export { createFakeEvent, fakeEvents };
