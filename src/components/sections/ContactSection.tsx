"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "support@shareindia.com" },
  { icon: Phone, label: "+91 1800 123 4567" },
  { icon: MapPin, label: "BKC, Mumbai, India" },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent-pink">
            Contact
          </p>
          <h2
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Talk to our team
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Questions about accounts, margins, or the API? We usually reply within a few hours.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {CONTACT_INFO.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
                  <Icon size={16} className="text-accent-cyan" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="glass flex flex-col gap-4 rounded-2xl p-8"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/60">
              Name
            </label>
            <input
              id="name"
              required
              type="text"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus-visible:border-accent-cyan/60"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus-visible:border-accent-cyan/60"
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/60">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus-visible:border-accent-cyan/60"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
          >
            {submitted ? "Message sent!" : "Send Message"}
            <Send size={15} />
          </button>
          <p aria-live="polite" className="sr-only">
            {submitted ? "Your message has been sent." : ""}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
