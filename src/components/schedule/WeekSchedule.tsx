"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import {
  WEEKDAYS,
  formatRange,
  formatTime,
  layoutLanes,
  toHours,
  weekday,
} from "@/lib/schedule";

export type ScheduleClass = {
  id: string;
  weekday: number;
  start: string;
  end: string;
  name: string;
  description: string;
  highlights: string[];
  group: { label: string; dot: string; soft: string; ink: string };
  // Link to ask for this class (WhatsApp, or the form when there is no number).
  href: string;
};

type Props = {
  classes: ScheduleClass[];
  locationName: string;
  hours: { start: number; end: number };
};

const DESKTOP_PX_PER_HOUR = 60;
const MOBILE_PX_PER_HOUR = 48;
const GRID_OFFSET = 10;

type Position = {
  top: number;
  height: number;
  left: string;
  width: string;
  // Shares its time slot with another class, so it only gets part of the column.
  shared: boolean;
};

// Position of every class of one day; simultaneous classes share the column width.
function dayPositions(
  dayClasses: ScheduleClass[],
  startHour: number,
  pxPerHour: number,
  gap: number,
): Map<string, Position> {
  const lanes = layoutLanes(dayClasses);
  return new Map(
    dayClasses.map((c) => {
      const { lane, lanes: count } = lanes.get(c.id)!;
      return [
        c.id,
        {
          top:
            Math.round((toHours(c.start) - startHour) * pxPerHour) +
            GRID_OFFSET,
          height:
            Math.round((toHours(c.end) - toHours(c.start)) * pxPerHour) - 4,
          left: `calc(${(lane / count) * 100}% + ${gap}px)`,
          width: `calc(${100 / count}% - ${gap * 2}px)`,
          shared: count > 1,
        },
      ];
    }),
  );
}

export function WeekSchedule({ classes, locationName, hours }: Props) {
  const [selectedId, setSelectedId] = useState(classes[0]?.id);
  const [day, setDay] = useState(classes[0]?.weekday ?? 1);
  const selected = classes.find((c) => c.id === selectedId) ?? classes[0];
  if (!selected) return null;

  const hourMarks = Array.from(
    { length: hours.end - hours.start + 1 },
    (_, i) => hours.start + i,
  );
  const span = hours.end - hours.start;
  const dayClasses = classes.filter((c) => c.weekday === day);
  const others = classes.filter(
    (c) => c.name === selected.name && c.id !== selected.id,
  );

  const pickDay = (value: number) => {
    setDay(value);
    const first = classes.find((c) => c.weekday === value);
    if (first) setSelectedId(first.id);
  };

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-6">
      {/* Mobile: one day at a time */}
      <div className="flex flex-col gap-5 lg:hidden">
        <div className="flex gap-1">
          {WEEKDAYS.map((d) => {
            const count = classes.filter((c) => c.weekday === d.value).length;
            const active = d.value === day;
            return (
              <button
                key={d.value}
                type="button"
                aria-pressed={active}
                onClick={() => pickDay(d.value)}
                className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-[4px] ${
                  active
                    ? "bg-ink text-white"
                    : "bg-card shadow-[inset_0_0_0_1px_var(--color-line)]"
                }`}
              >
                <span className="text-sm font-bold">{d.short}</span>
                <span
                  className={`text-[11px] font-medium ${active ? "opacity-80" : "text-muted"}`}
                >
                  {count} {count === 1 ? "clase" : "clases"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="card px-3 pt-3.5 pb-4">
          <p className="border-b-[1.5px] border-ink pb-2.5 text-base font-bold">
            {weekday(day).full}
          </p>
          {dayClasses.length === 0 ? (
            <p className="pt-4 text-sm font-medium text-muted">
              Sin clases este día.
            </p>
          ) : (
            <TimeGrid
              hourMarks={hourMarks}
              pxPerHour={MOBILE_PX_PER_HOUR}
              span={span}
              labelWidth="44px"
              columns={1}
            >
              <DayColumn
                classes={dayClasses}
                selectedId={selected.id}
                onPick={setSelectedId}
                startHour={hours.start}
                variant="mobile"
              />
            </TimeGrid>
          )}
        </div>
      </div>

      {/* Desktop: the whole week */}
      <div className="card hidden px-4 pt-4 pb-5 lg:block">
        <div className="grid grid-cols-[48px_repeat(7,minmax(0,1fr))] border-b-[1.5px] border-ink pb-2.5">
          <span />
          {WEEKDAYS.map((d) => (
            <span key={d.value} className="text-center text-sm font-bold">
              {d.short}
            </span>
          ))}
        </div>
        <TimeGrid
          hourMarks={hourMarks}
          pxPerHour={DESKTOP_PX_PER_HOUR}
          span={span}
          labelWidth="48px"
          columns={7}
        >
          {WEEKDAYS.map((d) => (
            <DayColumn
              key={d.value}
              classes={classes.filter((c) => c.weekday === d.value)}
              selectedId={selected.id}
              onPick={setSelectedId}
              startHour={hours.start}
              variant="desktop"
            />
          ))}
        </TimeGrid>
      </div>

      <aside
        aria-live="polite"
        className="flex flex-col overflow-hidden rounded-[4px] bg-card shadow-[0_12px_32px_rgba(20,19,19,0.12),inset_0_0_0_1px_var(--color-line)]"
      >
        <div
          className="h-2 lg:h-2.5"
          style={{ background: selected.group.dot }}
        />
        <div className="flex flex-col gap-3 px-5 py-[22px] lg:gap-3.5 lg:p-7">
          <span
            className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[13px] font-bold"
            style={{
              background: selected.group.soft,
              color: selected.group.ink,
            }}
          >
            <span
              aria-hidden
              className="size-2.5 rounded-full"
              style={{ background: selected.group.dot }}
            />
            {selected.group.label}
          </span>
          <h2 className="display m-0 text-2xl leading-7 tracking-[-0.01em] lg:text-[28px] lg:leading-8">
            {selected.name}
          </h2>
          <div className="flex flex-col gap-0.5 text-[15px] font-bold lg:gap-1">
            <span>
              {weekday(selected.weekday).full} ·{" "}
              {formatRange(selected.start, selected.end)}
            </span>
            <span className="font-medium text-muted">{locationName}</span>
          </div>
          <p className="text-[15px] leading-6 text-muted lg:text-base lg:leading-[26px]">
            {selected.description}
          </p>
          {selected.highlights.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-line pt-3 lg:pt-3.5">
              <p className="eyebrow text-brand-text">Qué se trabaja</p>
              {selected.highlights.map((point) => (
                <p
                  key={point}
                  className="flex items-center gap-2.5 text-[15px] font-bold"
                >
                  <CheckIcon />
                  {point}
                </p>
              ))}
            </div>
          )}
          <p className="text-[13px] leading-5 font-medium text-muted lg:text-sm lg:leading-[22px]">
            {others.length > 0
              ? `También esta semana: ${others.map((c) => `${weekday(c.weekday).short} ${formatTime(c.start)}`).join(" · ")}`
              : "Esta es la única clase de este tipo en la semana."}
          </p>
          <a href={selected.href} className="btn btn-accent">
            Probar esta clase gratis →
          </a>
        </div>
      </aside>
    </div>
  );
}

type GridProps = {
  hourMarks: number[];
  pxPerHour: number;
  span: number;
  labelWidth: string;
  columns: number;
  children: React.ReactNode;
};

function TimeGrid({
  hourMarks,
  pxPerHour,
  span,
  labelWidth,
  columns,
  children,
}: GridProps) {
  return (
    <div
      className="relative grid"
      style={{
        gridTemplateColumns: `${labelWidth} repeat(${columns}, minmax(0, 1fr))`,
        height: span * pxPerHour + GRID_OFFSET * 2,
        background: `repeating-linear-gradient(180deg, var(--color-mist) 0 1px, transparent 1px ${pxPerHour}px)`,
        backgroundPosition: `0 ${GRID_OFFSET}px`,
      }}
    >
      <div className="relative">
        {hourMarks.map((h, i) => (
          <span
            key={h}
            className="absolute left-0 text-[11px] font-bold text-muted lg:text-xs"
            style={{ top: i * pxPerHour + 2 }}
          >
            {h}:00
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

type DayColumnProps = {
  classes: ScheduleClass[];
  selectedId: string;
  onPick: (id: string) => void;
  startHour: number;
  variant: "desktop" | "mobile";
};

function DayColumn({
  classes,
  selectedId,
  onPick,
  startHour,
  variant,
}: DayColumnProps) {
  const mobile = variant === "mobile";
  const positions = dayPositions(
    classes,
    startHour,
    mobile ? MOBILE_PX_PER_HOUR : DESKTOP_PX_PER_HOUR,
    mobile ? 4 : 3,
  );
  return (
    <div className="relative border-l border-mist">
      {classes.map((c) => (
        <ClassBlock
          key={c.id}
          c={c}
          active={c.id === selectedId}
          onPick={() => onPick(c.id)}
          position={positions.get(c.id)!}
          variant={variant}
        />
      ))}
    </div>
  );
}

type BlockProps = {
  c: ScheduleClass;
  active: boolean;
  onPick: () => void;
  position: Position;
  variant: "desktop" | "mobile";
};

function ClassBlock({ c, active, onPick, position, variant }: BlockProps) {
  const { shared, ...box } = position;
  const mobile = variant === "mobile";
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onPick}
      className={`absolute flex overflow-hidden rounded-[4px] text-left ${
        mobile
          ? "flex-wrap items-start justify-between gap-x-2 px-3 py-2"
          : `flex-col items-start gap-0.5 py-[7px] ${shared ? "px-1" : "px-2"}`
      } ${active ? "shadow-block" : ""}`}
      style={{
        ...box,
        background: active ? c.group.dot : c.group.soft,
        boxShadow: active ? undefined : `inset 0 3px 0 ${c.group.dot}`,
      }}
    >
      <span
        className={
          mobile
            ? "text-sm leading-[18px] font-bold"
            : `w-full leading-[15px] font-bold wrap-anywhere hyphens-auto ${shared ? "text-[11px]" : "text-xs"}`
        }
      >
        {c.name}
      </span>
      <span
        className={`${mobile ? "text-xs whitespace-nowrap" : "text-[11px]"} ${active ? "font-bold" : "font-medium text-muted"}`}
      >
        {mobile ? formatRange(c.start, c.end) : formatTime(c.start)}
      </span>
    </button>
  );
}
