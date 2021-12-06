import dayjs from "dayjs";
import { date as fakeDate } from "faker";
import { v4 as uuidv4 } from "uuid";

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
    ...event,
  };
};

const fakeEvents: IEvent[] = [
  // Future events
  createFakeEvent({
    date: dayjs().add(15, "day").toISOString(),
    title: "Camping Trip",
    cost: 25,
    stats: {
      attending: 14,
      unpaid: 13,
    },
  }),
  createFakeEvent({
    date: dayjs().add(6, "day").toISOString(),
    title: "Ice Skating",
    cost: undefined,
    stats: {
      attending: 5,
      unpaid: 2,
    },
  }),
  // Past events
  createFakeEvent({
    date: dayjs().subtract(1, "day").toISOString(),
    title: "Family Supper",
    cost: undefined,
    stats: {
      attending: 6,
      unpaid: 2,
    },
  }),
  createFakeEvent({
    date: dayjs().subtract(2, "day").toISOString(),
    title: "Pickup Hockey",
    cost: 15,
    stats: {
      attending: 18,
      unpaid: 0,
    },
  }),
  createFakeEvent({
    date: dayjs().subtract(5, "day").toISOString(),
    title: "Volleyball Game",
    cost: 10,
    stats: {
      attending: 12,
      unpaid: 9,
    },
  }),
];

export { createFakeEvent, fakeEvents };