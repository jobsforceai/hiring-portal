"use client";

import { QuestionOptionDTO } from "@/types/test";

export default function MCQGroup({
  name,
  options,
  selected,
  onChange,
}: {
  name: string;
  options: QuestionOptionDTO[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-3 grid gap-2">
      {options.map((opt) => (
        <label
          key={opt.key}
          className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.key}
            defaultChecked={selected === opt.key}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4"
          />
          <span className="text-sm">{opt.text}</span>
        </label>
      ))}
    </div>
  );
}
