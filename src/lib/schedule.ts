import type { ScheduleSlot } from "@/lib/data";

export const WEEKDAYS = [
  { value: 1, short: "Lun", full: "Lunes" },
  { value: 2, short: "Mar", full: "Martes" },
  { value: 3, short: "Mié", full: "Miércoles" },
  { value: 4, short: "Jue", full: "Jueves" },
  { value: 5, short: "Vie", full: "Viernes" },
  { value: 6, short: "Sáb", full: "Sábado" },
  { value: 7, short: "Dom", full: "Domingo" },
] as const;

export function weekday(value: number) {
  return WEEKDAYS.find((day) => day.value === value) ?? WEEKDAYS[0];
}

// "15:00:00" → "15:00", "07:00:00" → "7:00"
export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${Number(h)}:${m}`;
}

export function formatRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

// "18:30:00" → 18.5
export function toHours(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

// Today's calendar date, weekday (1 = Monday) and time in the business time zone.
function nowIn(timeZone: string, now: Date) {
  const format = (zone: string) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = format(timeZone);
  } catch {
    // Unknown zone name in the database.
    parts = format("UTC");
  }
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  // A UTC date that only carries the calendar day, so adding days is safe.
  const today = new Date(Date.UTC(get("year"), get("month") - 1, get("day")));
  return {
    today,
    weekday: today.getUTCDay() || 7,
    time: `${String(get("hour")).padStart(2, "0")}:${String(get("minute")).padStart(2, "0")}`,
  };
}

export type UpcomingClass = {
  key: string;
  slot: ScheduleSlot;
  // "Hoy", "Mañana" or the weekday.
  dayLabel: string;
  // "14 oct"
  dateLabel: string;
};

// The next classes of a weekly schedule, with their actual dates. A class that
// already started today moves to next week.
export function upcomingClasses(
  slots: ScheduleSlot[],
  timeZone: string,
  limit: number,
  now: Date = new Date(),
): UpcomingClass[] {
  const current = nowIn(timeZone, now);
  return slots
    .map((slot) => {
      let daysAhead = (slot.weekday - current.weekday + 7) % 7;
      if (daysAhead === 0 && slot.start_time.slice(0, 5) <= current.time)
        daysAhead = 7;
      return { slot, daysAhead };
    })
    .sort(
      (a, b) =>
        a.daysAhead - b.daysAhead ||
        a.slot.start_time.localeCompare(b.slot.start_time),
    )
    .slice(0, limit)
    .map(({ slot, daysAhead }) => {
      const date = new Date(current.today);
      date.setUTCDate(date.getUTCDate() + daysAhead);
      return {
        key: slot.id,
        slot,
        dayLabel:
          daysAhead === 0
            ? "Hoy"
            : daysAhead === 1
              ? "Mañana"
              : weekday(slot.weekday).full,
        dateLabel: `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`,
      };
    });
}

// Hour range shown on the weekly grid, rounded to whole hours around the data.
export function hourRange(slots: ScheduleSlot[]): {
  start: number;
  end: number;
} {
  if (slots.length === 0) return { start: 7, end: 20 };
  return {
    start: Math.floor(Math.min(...slots.map((s) => toHours(s.start_time)))),
    end: Math.ceil(Math.max(...slots.map((s) => toHours(s.end_time)))),
  };
}

// Classes that overlap in time on the same day are drawn side by side: each gets
// a lane, and `lanes` is how many lanes its group of overlapping classes needs.
export function layoutLanes<
  T extends { id: string; start: string; end: string },
>(items: T[]): Map<string, { lane: number; lanes: number }> {
  const layout = new Map<string, { lane: number; lanes: number }>();
  const sorted = [...items].sort(
    (a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end),
  );

  let cluster: T[] = [];
  let laneEnds: string[] = [];
  let clusterEnd = "";
  const closeCluster = () => {
    for (const item of cluster) layout.get(item.id)!.lanes = laneEnds.length;
    cluster = [];
    laneEnds = [];
  };

  for (const item of sorted) {
    if (cluster.length > 0 && item.start >= clusterEnd) closeCluster();
    let lane = laneEnds.findIndex((end) => end <= item.start);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = item.end;
    layout.set(item.id, { lane, lanes: 1 });
    cluster.push(item);
    if (item.end > clusterEnd || cluster.length === 1) clusterEnd = item.end;
  }
  closeCluster();
  return layout;
}
