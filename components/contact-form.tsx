"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ContactFormProps {
  dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const form = dict.contact.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = true;
    if (!message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center animate-[fade-in_0.5s_ease-out]">
        <svg
          className="mb-4 h-16 w-16 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <p className="text-lg font-medium text-emerald-300">
          {form.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {form.name} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-dark ${errors.name ? "input-error" : ""}`}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {form.email} <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`input-dark ${errors.email ? "input-error" : ""}`}
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {form.phone}
        </label>
        <input type="tel" id="phone" name="phone" className="input-dark" />
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="service"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {form.service}
        </label>
        <select id="service" name="service" className="input-dark">
          <option value="">—</option>
          {form.serviceOptions.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {form.message} <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`input-dark resize-none ${errors.message ? "input-error" : ""}`}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
      >
        {form.submit}
      </button>
    </form>
  );
}
