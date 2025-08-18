"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionDTO } from "@/types/test";

export default function Sidebar({ sections }: { sections: SectionDTO[] }) {
  return (
    <div className="space-y-4">
      <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{s.title}</span>
                <span className="text-white/60">{s.questions.length}</span>
              </div>
              <div className="text-[11px] text-white/50 mt-0.5">
                {s.type.replace("-", " ")}
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
