"use client";

import { useActionState, type ReactNode } from "react";
import { submitFreeClassRequest } from "@/app/actions";
import {
  AUDIENCES,
  type FreeClassField,
  type FreeClassFormState,
} from "@/lib/free-class";

type Props = {
  locations: { id: string; name: string }[];
  minAge: number;
  maxAge: number;
};

const INITIAL: FreeClassFormState = { status: "idle" };

export function FreeClassFields({ locations, minAge, maxAge }: Props) {
  const [state, action, pending] = useActionState(
    submitFreeClassRequest,
    INITIAL,
  );

  if (state.status === "success") {
    return (
      <div role="status" className="card flex flex-col gap-3 p-5 lg:p-10">
        <p className="eyebrow text-brand-text">Solicitud enviada</p>
        <p className="text-xl leading-7 font-bold lg:text-2xl lg:leading-[30px]">
          ¡Listo! Recibimos tus datos.
        </p>
        <p className="text-base leading-[26px] text-muted">
          Te escribiremos por WhatsApp para confirmar el día y la hora de tu
          clase.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const fieldProps = (name: FreeClassField) => ({
    name,
    id: `free-class-${name}`,
    defaultValue: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `free-class-${name}-error` : undefined,
    className: `field ${errors[name] ? "border-brand!" : ""}`,
  });

  return (
    <form
      action={action}
      noValidate
      className="card flex flex-col gap-4 p-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:p-10"
    >
      <Field name="full_name" label="Nombre completo" error={errors.full_name}>
        <input
          type="text"
          placeholder="Tu nombre"
          autoComplete="name"
          required
          {...fieldProps("full_name")}
        />
      </Field>
      <Field name="whatsapp" label="Número de WhatsApp" error={errors.whatsapp}>
        <input
          type="tel"
          placeholder="300 000 0000"
          autoComplete="tel"
          required
          {...fieldProps("whatsapp")}
        />
      </Field>
      <Field
        name="audience"
        label="¿Para quién es la clase?"
        error={errors.audience}
      >
        <select {...fieldProps("audience")}>
          {AUDIENCES.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </Field>
      <Field name="age" label="Edad de quien toma la clase" error={errors.age}>
        <input
          type="number"
          inputMode="numeric"
          min={minAge}
          max={maxAge}
          placeholder={`De ${minAge} a ${maxAge} años`}
          required
          {...fieldProps("age")}
        />
      </Field>
      <Field
        name="location_id"
        label="Sede"
        error={errors.location_id}
        className="lg:col-span-2"
      >
        <select {...fieldProps("location_id")}>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot against bots: hidden from people and assistive technology. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-col-reverse gap-4 pt-1 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:pt-2">
        <p
          aria-live="polite"
          className={`text-center text-[13px] font-medium lg:text-left lg:text-sm lg:leading-[22px] ${
            state.status === "error" ? "text-brand-text" : "text-muted"
          }`}
        >
          {state.status === "error"
            ? state.message
            : "Sin costo y sin compromiso."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-accent disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Enviando…" : "Agendar mi clase gratis →"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  name: FreeClassField;
  label: string;
  error: string | undefined;
  className?: string;
  children: ReactNode;
};

function Field({ name, label, error, className = "", children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={`free-class-${name}`} className="text-sm font-bold">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`free-class-${name}-error`}
          className="text-[13px] font-medium text-brand-text"
        >
          {error}
        </p>
      )}
    </div>
  );
}
