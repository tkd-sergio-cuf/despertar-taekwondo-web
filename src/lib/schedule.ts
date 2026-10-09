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

// [1,2,3,4,5] → "Lunes a viernes", [6,7] → "Sábado y domingo", [1,3] → "Lunes y miércoles"
export function formatDays(days: number[]): string {
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  const names = sorted.map((d, i) =>
    i === 0 ? weekday(d).full : weekday(d).full.toLowerCase(),
  );
  const consecutive = sorted.every(
    (d, i) => i === 0 || d === sorted[i - 1] + 1,
  );
  if (sorted.length >= 3 && consecutive)
    return `${names[0]} a ${names[names.length - 1]}`;
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

export type ScheduleSummaryItem = {
  key: string;
  time: string;
  label: string;
  color: string;
  days: string;
};

// Home page summary: back-to-back slots of the same group are merged into one block
// (counting the turns), and identical blocks on different days are listed once.
export function summarizeSchedule(
  slots: ScheduleSlot[],
): ScheduleSummaryItem[] {
  type Block = {
    groupId: string;
    label: string;
    color: string;
    start: string;
    end: string;
    turns: number;
    day: number;
  };
  const blocks: Block[] = [];

  for (const day of WEEKDAYS) {
    const daySlots = slots
      .filter((s) => s.weekday === day.value)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
    for (const slot of daySlots) {
      const group = slot.class_type.class_group;
      const last = blocks[blocks.length - 1];
      if (
        last &&
        last.day === day.value &&
        last.groupId === group.id &&
        last.end === slot.start_time
      ) {
        last.end = slot.end_time;
        last.turns += 1;
      } else {
        blocks.push({
          groupId: group.id,
          label: group.label,
          color: group.color_dot,
          start: slot.start_time,
          end: slot.end_time,
          turns: 1,
          day: day.value,
        });
      }
    }
  }

  const merged = new Map<string, Block & { days: number[] }>();
  for (const block of blocks) {
    const key = `${block.groupId}|${block.start}|${block.end}|${block.turns}`;
    const existing = merged.get(key);
    if (existing) existing.days.push(block.day);
    else merged.set(key, { ...block, days: [block.day] });
  }

  return [...merged.entries()]
    .sort(
      ([, a], [, b]) => a.days[0] - b.days[0] || a.start.localeCompare(b.start),
    )
    .map(([key, b]) => ({
      key,
      time: formatRange(b.start, b.end),
      label: b.turns > 1 ? `${b.label} · ${b.turns} turnos` : b.label,
      color: b.color,
      days: formatDays(b.days),
    }));
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
