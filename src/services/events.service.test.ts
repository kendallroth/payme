// Utilities
import EventsService from "./events.service";

// Types
import { IEvent, IEventsByTime } from "@typings/event.types";

describe("'separateEventsByTime'", () => {
  it("separates events by time (past/future)", () => {
    const futureEvent: IEvent = {
      id: "1",
      archivedAt: null,
      createdAt: "fake",
      date: "2021-11-29T05:03:59.744Z",
      title: "Future",
    };
    const todayEvent: IEvent = {
      id: "2",
      archivedAt: null,
      createdAt: "fake",
      date: "2021-11-28T15:03:59.744Z",
      title: "Today",
    };
    const pastEvent: IEvent = {
      id: "3",
      archivedAt: null,
      createdAt: "fake",
      date: "2021-11-27T05:03:59.744Z",
      title: "Past",
    };
    const comparisonDate = "2021-11-28T05:00:00.000Z";
    const input: IEvent[] = [todayEvent, futureEvent, pastEvent];

    const output = EventsService.separateEventsByTime(input, comparisonDate);

    const expected: IEventsByTime = {
      futureEvents: [todayEvent, futureEvent],
      pastEvents: [pastEvent],
    };

    expect(output).toEqual(expected);
  });
});
