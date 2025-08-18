"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import TextAnswer from "./TextAnswer";
import { QuestionDTO, SectionType } from "@/types/test";
import MCQGroup from "./MCQGroups";

export default function QuestionCard({
  index,
  question,
  sectionType,
  value,
  onChange,
  answered,
}: {
  index: number;
  question: QuestionDTO;
  sectionType: SectionType;
  value: string;
  onChange: (v: string) => void;
  answered: boolean;
}) {
  const showMCQ =
    sectionType === "multiple-choice" &&
    question.options &&
    question.options.length > 0;

  return (
    <Card className="rounded-xl border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="font-medium">
          Q{index + 1}. {question.prompt}
        </div>
        {answered ? (
          <span className="inline-flex items-center gap-1 text-emerald-300 text-xs">
            <Check className="h-3.5 w-3.5" /> answered
          </span>
        ) : null}
      </div>

      {showMCQ ? (
        <MCQGroup
          name={`answers[${question.id}]`}
          options={question.options!}
          selected={value}
          onChange={onChange}
        />
      ) : (
        <TextAnswer
          name={`answers[${question.id}]`}
          value={value}
          onChange={onChange}
          placeholder={
            sectionType === "short-answer"
              ? "Type your answer…"
              : sectionType === "practical"
              ? "Describe your approach, include code snippets if needed…"
              : "Write your response…"
          }
        />
      )}
    </Card>
  );
}
