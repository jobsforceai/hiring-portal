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

export default function ResultsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = React.use(params);
  const router = useRouter();

  const { email, result, resultLoading, getResults } = useTestStore();

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
              {result.answers.map((ans, i) => (
                <div
                  key={ans.questionId}
                  className="p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium mb-2">Question {i + 1}</p>
                    {ans.manualScore !== undefined && (
                      <p className="text-sm">
                        Score:{" "}
                        <span className="font-semibold text-sky-400">
                          {ans.manualScore}
                        </span>
                      </p>
                    )}
                  </div>
                  <p className="text-white/80 bg-white/5 p-3 rounded-lg mb-2">
                    {ans.answer}
                  </p>
                  {ans.notes && (
                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                      <p className="font-semibold text-sky-400 text-sm mb-1">
                        Notes from grader
                      </p>
                      <p className="text-white/90 text-sm">{ans.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/assignments">
            <Button
              variant="outline"
              className="border-white/20 bg-transparent hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Assignments
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
