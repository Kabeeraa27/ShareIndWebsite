"use client";

import { motion } from "framer-motion";
import type { DeskNotePost } from "@/data/deskNotes";

interface DeskNotePostCardProps {
  post: DeskNotePost;
  color: string;
  index: number;
}

/** One dated desk note — a header bar (date + byline) over a body of
 *  paragraphs, distinct from ReportCard's file-download look since these
 *  are read in place, not downloaded. */
export function DeskNotePostCard({ post, color, index }: DeskNotePostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-[var(--inst-border)] bg-[var(--inst-card-bg)] shadow-sm"
    >
      <header
        className="flex flex-wrap items-baseline gap-x-2 px-5 py-3"
        style={{ background: `${color}14` }}
      >
        <span className="text-sm font-semibold text-[var(--inst-heading)]">{post.date}</span>
        <span className="text-sm text-[var(--inst-text-muted)]">
          — By {post.author}, {post.role}
        </span>
      </header>
      <div className="flex flex-col gap-3 px-5 py-5">
        {post.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-[var(--inst-text)]">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.article>
  );
}
