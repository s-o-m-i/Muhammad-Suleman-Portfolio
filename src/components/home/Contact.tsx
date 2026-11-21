"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionScope } from "@/components/motion/MotionScope";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight, IconDownload } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { site, socialLinks } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "contact-field mt-2 w-full bg-transparent px-0 py-2.5 text-base text-ink transition-colors placeholder:text-muted/60";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("The form could not be sent. Use email instead and I’ll reply directly.");
    }
  }

  return (
    <MotionScope as="section" id="contact" className="relative overflow-hidden bg-pine py-24 text-cream sm:py-32">
      <Container className="relative">
        <p className="flex items-center gap-3" data-reveal>
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
          <span className="label">Contact</span>
        </p>
        <h2
          data-split
          className="font-display mt-6 max-w-4xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-7xl lg:text-[6rem]"
        >
          Have an idea worth building?
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p data-reveal className="max-w-md text-base leading-8 text-cream/75">
              Whether you&apos;re looking for a developer to build your next product, need help
              improving your website&apos;s search visibility, or want to discuss an opportunity,
              I&apos;d love to hear from you.
            </p>

            <a
              data-reveal
              href={`mailto:${site.email}`}
              className="group font-display mt-10 inline-block max-w-full text-xl font-semibold tracking-tight break-all text-cream sm:text-2xl"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="mt-2 block h-px w-full origin-left scale-x-[0.35] bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal-group>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-cream/80 transition-colors hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <IconArrowUpRight size={14} />
                </a>
              ))}
              <Link
                href={site.resumePath}
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <IconDownload />
                Download Resume
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <form
              onSubmit={onSubmit}
              data-clip="up"
              className="contact-form bg-bg-2 p-6 text-ink shadow-[0_60px_120px_-60px_rgba(0,0,0,0.6)] sm:p-10"
            >
              <p className="label">Send a message</p>
              <div className="mt-6 grid gap-7" data-reveal-group data-delay="0.4">
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block text-sm text-muted">
                    Name
                    <input name="name" required autoComplete="name" className={fieldClass} />
                  </label>
                  <label className="block text-sm text-muted">
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </label>
                </div>
                <label className="block text-sm text-muted">
                  Subject
                  <input name="subject" required className={fieldClass} />
                </label>
                <label className="block text-sm text-muted">
                  Message
                  <textarea name="message" required rows={5} className={`${fieldClass} resize-y`} />
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" disabled={status === "submitting"} className="px-6 py-3">
                    {status === "submitting" ? "Sending…" : "Send message"}
                    <IconArrowUpRight size={15} />
                  </Button>
                  {status === "success" ? (
                    <p className="text-sm text-forest" role="status">
                      Message sent. I’ll get back to you by email.
                    </p>
                  ) : null}
                </div>
                {status === "error" ? (
                  <p className="text-sm text-muted" role="alert">
                    {error}{" "}
                    <a className="text-forest underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </MotionScope>
  );
}
