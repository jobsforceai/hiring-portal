"use server";

import { SubmitResult } from "@/types/test";

export async function submitAssignmentAction(
  _: any,
  formData: FormData
): Promise<SubmitResult> {
  try {
    const jobId = String(formData.get("jobId") || "");
    if (!jobId) return { ok: false, message: "Missing job id" };

    // Gather answers from inputs named like answers[<questionId>]
    const answers: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      const m = /^answers\[(.+)\]$/.exec(k);
      if (m) {
        answers[m[1]] = typeof v === "string" ? v : "";
      }
    }

    const payload = {
      answers,
      meta: {
        userAgent: formData.get("ua") || "",
        clientTimeMs: Number(formData.get("clientTimeMs") || 0) || undefined,
      },
    };

    const res = await fetch(
      `${process.env.API_URL}/api/v1/jobs/${jobId}/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message || data?.error || "Submission failed",
      };
    }

    return {
      ok: true,
      message: data?.message || "Submitted successfully",
      score: data?.score ?? null,
      nextUrl: data?.nextUrl ?? null,
    };
  } catch (e: any) {
    return { ok: false, message: e?.message || "Something went wrong" };
  }
}
