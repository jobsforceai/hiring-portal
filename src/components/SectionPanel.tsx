"use client";

import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Send } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useState } from "react";
import { AssignmentDTO } from "@/types/test";
import QuestionCard from "./QuestionCard";
import { useLocalAnswers } from "@/hooks/useLocalAnswer";
import { submitAssignmentAction } from "@/actions/assignments";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400"
    >
      {pending ? (
        "Submitting…"
      ) : (
        <span className="inline-flex items-center gap-2">
          Submit responses <Send className="h-4 w-4" />
        </span>
      )}
    </Button>
  );
}

export default function SectionPanel({
  assignment,
  jobId,
}: {
  assignment: AssignmentDTO;
  jobId: string;
}) {
  const initialState = {
    ok: false,
    message: "",
    score: null as number | null,
    nextUrl: null as string | null,
  };
  const [state, formAction] = useFormState(
    submitAssignmentAction,
    initialState
  );

  const { answers, setAnswers, reset } = useLocalAnswers(jobId);
  const [open, setOpen] = useState(false);

  const { totalQuestions, answeredCount } = useMemo(() => {
    const total = assignment.sections.reduce(
      (acc, s) => acc + s.questions.length,
      0
    );
    const answered = Object.values(answers).filter(
      (v) => String(v || "").trim().length > 0
    ).length;
    return { totalQuestions: total, answeredCount: answered };
  }, [answers, assignment.sections]);

  useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(state.message || "Submitted successfully");
      if (state.score != null) toast.message(`Score: ${state.score}`);
      reset();
      if (state.nextUrl) window.location.assign(state.nextUrl);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, reset]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="jobId" value={jobId} />
      <input
        type="hidden"
        name="ua"
        value={typeof navigator !== "undefined" ? navigator.userAgent : ""}
      />
      <input type="hidden" name="clientTimeMs" value={Date.now()} />

      {/* Top progress card */}
      <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-white/80">
            {answeredCount} / {totalQuestions} answered
          </div>
          <div className="min-w-[180px]">
            <Progress
              value={
                totalQuestions ? (answeredCount / totalQuestions) * 100 : 0
              }
              className="h-2"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            Review & Submit
          </Button>
        </div>
      </Card>

      {/* Sections */}
      {assignment.sections.map((section, si) => (
        <motion.div
          key={si}
          id={`section-${si}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">
                {section.type.replace("-", " ")}
              </div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="text-sm text-white/60">
              {section.pointsPerQuestion} pt/question
            </div>
          </div>

          <div className="p-5 space-y-5">
            {section.questions.map((q, qi) => {
              const isAnswered = !!answers[q.id]?.trim();
              return (
                <QuestionCard
                  key={q.id}
                  index={qi}
                  question={q}
                  sectionType={section.type}
                  answered={isAnswered}
                  value={answers[q.id] || ""}
                  onChange={(val) => setAnswers((a) => ({ ...a, [q.id]: val }))}
                />
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Review & Submit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit your responses?</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-white/80">
            <p>
              Answered: {answeredCount} / {totalQuestions}
            </p>
            <p className="text-white/60">
              You won’t be able to edit after submitting.
            </p>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
