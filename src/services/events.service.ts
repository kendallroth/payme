import dayjs from "dayjs";

// Types
import { IEvent, IEventsByTime, IEventStats } from "@typings/event.types";
import { IEventAttendance } from "@typings/attendance.types";

class EventsService {
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
