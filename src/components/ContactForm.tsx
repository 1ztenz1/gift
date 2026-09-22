"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import { mailtoLink, whatsappLink } from "@/lib/whatsapp";
import { Mail, WhatsApp } from "./icons";

const topics = [
  "A question about an order",
  "Custom order enquiry",
  "Bulk / corporate order",
  "Delivery or tracking",
  "Something else",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ name?: string; body?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "So we know who is writing.";
    if (body.trim().length < 10) next.body = "A line or two about what you need.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = [
    `*${topic}*`,
    "",
    `From: ${name || "(no name given)"}`,
    contact ? `Reach me on: ${contact}` : null,
    "",
    body,
  ]
    .filter((part) => part !== null)
    .join("\n");

  const guard = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) event.preventDefault();
  };

  const labelClass = "mb-1.5 block text-[13px] font-medium text-muted";
  const controlClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[14.5px] placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7"
    >
      <h2 className="font-display text-2xl">Send a message</h2>
      <p className="mt-1.5 text-[14px] text-muted">
        This writes your message and hands it to WhatsApp or your email app —
        nothing is stored on this site.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelClass}>
            Your name <span className="text-rose">*</span>
          </label>
          <input
            id="ct-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((c) => ({ ...c, name: undefined }));
            }}
            placeholder="Afni Rahman"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cx(controlClass, errors.name && "border-rose")}
          />
          {errors.name ? (
            <p className="mt-1.5 text-[12.5px] text-[#9B2226]">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="ct-contact" className={labelClass}>
            Phone or email
          </label>
          <input
            id="ct-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="+91 90000 00000"
            className={controlClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="ct-topic" className={labelClass}>
          What is it about
        </label>
        <select
          id="ct-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={controlClass}
        >
          {topics.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="ct-body" className={labelClass}>
          Your message <span className="text-rose">*</span>
        </label>
        <textarea
          id="ct-body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setErrors((c) => ({ ...c, body: undefined }));
          }}
          rows={5}
          placeholder="Tell us what you need and when you need it by."
          aria-invalid={Boolean(errors.body)}
          className={cx(controlClass, "resize-none", errors.body && "border-rose")}
        />
        {errors.body ? (
          <p className="mt-1.5 text-[12.5px] text-[#9B2226]">{errors.body}</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={guard}
          className="flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#1FA855] text-[15px] font-medium text-white shadow-soft transition hover:bg-[#188C46] active:scale-[0.98]"
        >
          <WhatsApp size={19} />
          Send on WhatsApp
        </a>
        <a
          href={mailtoLink(topic, message)}
          onClick={guard}
          className="flex h-13 items-center justify-center gap-2 rounded-full border border-line px-6 text-[14.5px] font-medium transition hover:border-gold hover:bg-shell"
        >
          <Mail size={17} />
          Email instead
        </a>
      </div>
    </form>
  );
}
