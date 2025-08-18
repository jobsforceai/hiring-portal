"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useTestStore } from "@/store/testScore";

export default function TestPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = React.use(params);
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const {
    email,
    assignment,
    answers,
    setAnswer,
    startTest,
    loading,
    submitTest,
  } = useTestStore();

  // If user refreshed this page and assignment isn't loaded yet but we have email → refetch
  React.useEffect(() => {
    if (!assignment && email) {
      startTest(jobId, email).catch((err) => {
        toast.error(err?.message || "Failed to load assignment");
      });
    }
  }, [assignment, email, jobId, startTest]);

  if (loading || !assignment) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <div className="animate-pulse w-full max-w-4xl space-y-4">
          <div className="h-8 w-64 bg-white/10 rounded" />
          <div className="h-4 w-40 bg-white/10 rounded" />
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!email || !assignment) {
    // no email saved — send back to login for this job
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Email required</h2>
            <p className="text-white/70 text-sm">
              Please enter your email to continue.
            </p>
            <Button onClick={() => router.replace(`/jobs/${jobId}/login`)}>
              Go to login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const totalQuestions = assignment?.sections.reduce(
    (acc, s) => acc + s.questions.length,
    0
  );
  const answeredCount = Object.values(answers).filter((v) => v?.trim()).length;
  const progress = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await submitTest();
    if (res.ok) {
      useTestStore.getState().reset?.();
      toast.success(res.message);
      router.replace(`/jobs/${jobId}/submitted`);
    } else {
      toast.error(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{assignment?.title}</h1>
            <p className="text-sm text-white/70">
              Passing score: {assignment?.passingScore}
            </p>
          </div>
          <div className="min-w-[220px]">
            <div className="text-sm text-white/80 mb-2">
              {answeredCount} / {totalQuestions} answered
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {assignment?.sections.map((section, si) => (
            <div
              key={si}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/60">{section.type}</div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <div className="text-sm text-white/60">
                  {section.pointsPerQuestion} pt/question
                </div>
              </div>

              <div className="p-5 space-y-5">
                {section.questions.map((q, qi) => {
                  const val = answers[q.id] || "";

                  if (section.type === "multiple-choice" && q.options?.length) {
                    return (
                      <div
                        key={q.id}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="font-medium mb-3">
                          Q{qi + 1}. {q.prompt}
                        </div>
                        <div className="grid gap-2">
                          {q.options.map((opt) => {
                            const name = `answers[${q.id}]`;
                            return (
                              <label
                                key={opt.key}
                                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={name}
                                  value={opt.key}
                                  checked={val === opt.key}
                                  onChange={(e) =>
                                    setAnswer(q.id, e.currentTarget.value)
                                  }
                                  className="h-4 w-4"
                                />
                                <span className="text-sm">{opt.text}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // short-answer / practical / roleplay => textarea
                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="font-medium mb-3">
                        Q{qi + 1}. {q.prompt}
                      </div>
                      <Textarea
                        value={val}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        placeholder={
                          section.type === "short-answer"
                            ? "Type your answer…"
                            : section.type === "practical"
                            ? "Describe your approach; add code if needed…"
                            : "Write your response…"
                        }
                        className="min-h-[120px] bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="min-w-40 bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400"
          >
            {submitting ? "Submitting...." : "Submit responses"}
          </Button>
        </div>
      </div>
    </div>
  );
}
