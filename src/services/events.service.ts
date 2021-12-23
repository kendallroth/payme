import dayjs from "dayjs";

// Types
import {
  IEvent,
  IEventsByTime,
  IEventStats,
  IEventStatsUpdate,
} from "@typings/event.types";
import { IEventAttendance } from "@typings/attendance.types";

type EventStatUpdates = {
  [key: string]: IEventStatsUpdate | undefined;
};

class EventsService {
  /**
   * Calculate attendance stats for all events (with attendance)
   *
   * NOTE: Events with no attendance will not be included in calculations!
   *
   * NOTE: This is an expensive calculation and should be performed sparingly!
   *
   * @param   attendance Attendance records
   * @returns Event stats for all events with attendance
   */
  calculateAllEventStats(
    attendance: (IEventAttendance | undefined)[],
  ): IEventStatsUpdate[] {
    const updatesObj = Object.values(attendance).reduce(
      (accum, record): EventStatUpdates => {
        if (!record) return accum;
        const { eventId, paidAt } = record;

        const accumEvent = accum[eventId];
        const attending = accumEvent?.attending ?? 0;
        const unpaid = accumEvent?.unpaid ?? 0;

        return {
          ...accum,
          [eventId]: {
            eventId,
            attending: attending + 1,
            unpaid: paidAt ? unpaid : unpaid + 1,
          },
        };
      },
      {} as EventStatUpdates,
    );

    // TODO: Include events with no attendance (handles edge case of removing last event attendee before recalulating stats)

    return Object.values(updatesObj).filter((i) => i) as IEventStatsUpdate[];
  }

  /**
   * Calculate event attendance stats
   *
   * NOTE: Must support undefined as it is used with Redux store functions!
   *
   * @param   eventId    - Event ID
   * @param   attendance - Event attendance
   * @returns Event attendance stats
   */
  calculateEventStats(
    eventId: string,
    attendance: (IEventAttendance | undefined)[],
  ): IEventStats {
    const stats: IEventStats = attendance.reduce(
      (accum, a) => {
        if (a?.eventId !== eventId) return accum;

        return {
          attending: accum.attending + 1,
          unpaid: a.paidAt ? accum.unpaid : accum.unpaid + 1,
        };
      },
      { attending: 0, unpaid: 0 },
    );

    return stats;
  }

  /**
   * Separate events by time (past/future)
   *
   * @param   events - List of all events
   * @param   date   - Comparison date (if not today)
   * @returns Events separated by time
   */
  separateEventsByTime(events: IEvent[], date?: string): IEventsByTime {
    return events.reduce(
      (accum, e) => {
        const isPast = dayjs(date).isAfter(e.date, "day");
        if (isPast) {
          return { ...accum, pastEvents: [...accum.pastEvents, e] };
        } else {
          return { ...accum, futureEvents: [...accum.futureEvents, e] };
        }
      },
      { futureEvents: [], pastEvents: [] } as IEventsByTime,
    );
  }
}

const singleton = new EventsService();
export default singleton;
