"use client";

import { useEffect, useState } from "react";

export function useLocalAnswers(jobId: string) {
  const key = `test-answers:${jobId}`;
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(answers));
  }, [answers]);

  const reset = () => {
    if (typeof window !== "undefined") localStorage.removeItem(key);
  };

  return { answers, setAnswers, reset };
}
