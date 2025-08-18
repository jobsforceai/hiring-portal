"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextAnswer({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mt-3">
      <Textarea
        name={name}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] bg-white/10 border-white/20 placeholder:text-white/50 text-white"
      />
    </div>
  );
}
