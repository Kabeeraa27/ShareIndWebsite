"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { CORPORATE_OFFICE, SOCIAL_LINKS } from "@/data/institutional";

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: FaInstagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: FaYoutube, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: FaLinkedinIn, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: FaXTwitter, label: "X", href: SOCIAL_LINKS.x },
];

export function InstitutionalContactSection() {
  return (
    <section id="contact" className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Contact Us</h2>
        <div className="mt-2 mb-10 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a
            href={CORPORATE_OFFICE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] p-6 transition-colors hover:border-[var(--inst-primary)]/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--inst-primary)]/10">
              <MapPin size={20} className="text-[var(--inst-primary)]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="mb-1 font-semibold text-[var(--inst-heading)]">Corporate Office</h3>
              <p className="text-sm leading-relaxed text-[var(--inst-text)]">
                {CORPORATE_OFFICE.name} {CORPORATE_OFFICE.address}
              </p>
              <span className="mt-1.5 inline-block text-xs font-medium text-[var(--inst-primary)] group-hover:underline">
                Open in Google Maps
              </span>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-2xl border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--inst-accent)]/10">
              <Phone size={20} className="text-[var(--inst-accent)]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="mb-1 font-semibold text-[var(--inst-heading)]">Connect with Us</h3>
              <a
                href={`tel:${CORPORATE_OFFICE.phone.replace(/\s+/g, "")}`}
                className="text-sm font-medium text-[var(--inst-accent)] hover:text-[var(--inst-accent-dark)]"
              >
                {CORPORATE_OFFICE.phone}
              </a>
            </div>
          </div>
        </div>

        <h3 className="mt-10 mb-4 text-sm font-semibold tracking-wide text-[var(--inst-heading)]/70 uppercase">
          Follow Us On
        </h3>
        <div className="flex gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] text-[var(--inst-primary)] transition-colors hover:border-[var(--inst-accent)]/40 hover:text-[var(--inst-accent)]"
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
