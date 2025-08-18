"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useTestStore } from "@/store/testScore";

export default function LoginPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = React.use(params);
  const router = useRouter();
  const { setEmail, startTest, loading } = useTestStore();
  const [email, setEmailInput] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setEmail(email);
      await startTest(jobId, email); // fetch assignment & persist it
      router.replace(`/jobs/${jobId}`);
    } catch (err: any) {
      toast.error(err?.message || "Could not start the test");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#2A244A_0%,#0B0B18_60%)]">
      <Card className="text-white w-full max-w-md rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Continue to your test</CardTitle>
          <p className="text-sm text-white/70">
            Enter your email to fetch your assignment.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@company.com"
                  className="pl-9 bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400"
            >
              {loading ? "Loading…" : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
