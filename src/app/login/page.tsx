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

export default function CommonLoginPage() {
  const router = useRouter();
  const { setEmail, getAllAssignments, loading } = useTestStore();
  const [emailInput, setEmailInput] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setEmail(emailInput);
      await getAllAssignments(emailInput);
      router.replace(`/assignments`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not log in";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#2A244A_0%,#0B0B18_60%)]">
      <Card className="text-white w-full max-w-md rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Applicant Login</CardTitle>
          <p className="text-sm text-white/70">
            Enter your email to see your assignments.
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
                  value={emailInput}
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
