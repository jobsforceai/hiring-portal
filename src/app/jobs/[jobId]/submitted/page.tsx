"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SubmittedPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
      <Card className="text-white w-full max-w-md rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center">
        <div className="mx-auto mb-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold">Submission received</h1>
        <p className="text-white/70 mt-2">
          Thanks! Your test has been submitted. You’ll receive results soon.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-white/20 text-black"
            >
              Go to homepage
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
