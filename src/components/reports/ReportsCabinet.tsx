"use client";

import { useState } from "react";
import type { ReportSector } from "@/data/reports";
import { SectorFolderGrid } from "./SectorFolderGrid";
import { SectorFilePanel } from "./SectorFilePanel";

/** Owns which folder is open, wiring the grid to its detail panel. */
export function ReportsCabinet() {
  const [selected, setSelected] = useState<ReportSector | null>(null);

  return (
    <section className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectorFolderGrid onOpen={setSelected} />
      </div>
      <SectorFilePanel sector={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
