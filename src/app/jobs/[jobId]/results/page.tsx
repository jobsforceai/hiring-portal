"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTestStore } from "@/store/testScore";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Answer {
  questionId: string;
  answer: string;
  manualScore?: number;
  notes?: string;
  correctAnswer?: string;
  pointsPerQuestion?: number;
  modelAnswer?: string;
}

export default function ResultsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = React.use(params);
  const router = useRouter();

  const { email, result, resultLoading, getResults } =
    useTestStore();

  console.log("Results Page: jobId from params:", jobId);
  console.log("Results Page: email from store:", email);

  React.useEffect(() => {
    if (email) {
      console.log("Results Page: email found, calling getResults()");
      getResults().catch((err) => {
        toast.error(err?.message || "Failed to load results");
      });
    } else {
      console.log("Results Page: email not found, skipping getResults()");
    }
  }, [email, getResults]);

  React.useEffect(() => {
    if (result) {
      console.log("Backend Response for Results:", JSON.stringify(result, null, 2));
    }
  }, [result]);

  

  if (resultLoading) {
    console.log("Results Page: loading...");
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

  if (!email) {
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Email required</h2>
            <p className="text-white/70 text-sm">
              Please enter your email to view results.
            </p>
            <Button onClick={() => router.replace(`/login/${jobId}`)}>
              Go to login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <AlertCircle className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">No results found</h2>
          <p className="text-white/70 text-sm mt-2">
            We could not find a submission for your email address.
          </p>
        </Card>
      </div>
    );
  }

  if (result.status !== "graded") {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <Clock className="h-10 w-10 text-sky-400 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Grading in progress</h2>
          <p className="text-white/70 text-sm mt-2">
            Your submission is still being processed. Please check back later.
          </p>
        </Card>
      </div>
    );
  }

  const isPassed = result.totalScore >= result.passingScore;

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/assignments">
            <Button
              variant="outline"
              className="border-white/20 bg-transparent hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Assignments
            </Button>
          </Link>
        </div>
        <Card className="text-white p-6 sm:p-8 rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {result.assignmentTitle}
              </h1>
              <p className="text-white/70 mt-1">Submission results</p>
            </div>
            <div className="text-center">
              {isPassed ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 py-1 px-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Passed
                </Badge>
              ) : (
                <Badge variant="destructive" className="py-1 px-3 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Failed
                </Badge>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-center mb-8 p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-sm text-white/60">Total Score</div>
              <div className="text-3xl font-semibold text-sky-400">
                {result.totalScore}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60">Passing Score</div>
              <div className="text-3xl font-semibold">{result.passingScore}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Your Result</div>
              <div className="text-3xl font-semibold">
                {((result.totalScore / result.passingScore) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {result.graderNotes && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-semibold mb-2 text-lg">Grader Notes</h3>
              <p className="text-white/80 whitespace-pre-wrap">
                {result.graderNotes}
              </p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-4 text-xl">Answer Details</h3>
            <div className="space-y-4">
              {(result.answers as Answer[]).map((ans, i) => {
                let score = ans.manualScore;

                // For MCQs, calculate score based on `correctAnswer`
                if (ans.correctAnswer !== undefined) {
                  score =
                    ans.answer === ans.correctAnswer
                      ? ans.pointsPerQuestion
                      : 0;
                }

                const isMcqWrong =
                  ans.correctAnswer !== undefined &&
                  ans.answer !== ans.correctAnswer;

                const isCorrect =
                  ans.correctAnswer !== undefined &&
                  ans.answer === ans.correctAnswer;

                return (
                  <div
                    key={ans.questionId}
                    className={`p-4 rounded-2xl border ${
                      isCorrect
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium mb-2">Question {i + 1}</p>
                      {score !== undefined && (
                        <p
                          className={`text-sm font-semibold ${
                            isCorrect ? "text-emerald-400" : "text-sky-400"
                          }`}
                        >
                          Score: {score}
                        </p>
                      )}
                    </div>
                    <p className="text-slate-300 bg-black/20 p-3 rounded-lg mb-2 whitespace-pre-wrap">
                      Your answer: {ans.answer}
                    </p>

                    {isMcqWrong && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="font-semibold text-red-400 text-sm mb-1">
                          Correct Answer
                        </p>
                        <p className="text-white/90 text-sm">
                          {ans.correctAnswer}
                        </p>
                      </div>
                    )}

                    {ans.modelAnswer && (
                      <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 mt-2">
                        <p className="font-semibold text-sky-400 text-sm mb-1">
                          Model Answer
                        </p>
                        <p className="text-white/90 text-sm whitespace-pre-wrap">
                          {ans.modelAnswer}
                        </p>
                      </div>
                    )}

                    {ans.notes && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-2">
                        <p className="font-semibold text-amber-400 text-sm mb-1">
                          Notes from grader
                        </p>
                        <p className="text-white/90 text-sm whitespace-pre-wrap">
                          {ans.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
