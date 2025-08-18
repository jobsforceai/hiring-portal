"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SectionType =
  | "multiple-choice"
  | "short-answer"
  | "practical"
  | "roleplay";

export type QuestionOption = { key: string; text: string; _id?: string };
export type Question = {
  id: string;
  prompt: string;
  options?: QuestionOption[];
};
export type Section = {
  title: string;
  type: SectionType;
  pointsPerQuestion: number;
  questions: Question[];
};
export type Assignment = {
  _id: string;
  jobId: string;
  title: string;
  passingScore: number;
  sections: Section[];
};

export type SubmissionResult = {
  assignmentTitle: string;
  passingScore: number;
  status: "submitted" | "grading" | "graded";
  autoScore: number;
  manualScore: number;
  totalScore: number;
  graderNotes?: string;
  answers: {
    questionId: string;
    answer: string;
    manualScore?: number;
    notes?: string;
  }[];
};

export type UserAssignment = {
  jobId: string;
  jobTitle: string;
  assignmentId: string;
  applicationId: string;
  submissionStatus: "pending" | "submitted" | "grading" | "graded";
};

type TestState = {
  email: string;
  jobId: string;
  assignment?: Assignment;
  assignments: UserAssignment[];
  assignmentsFetched: boolean; // to prevent infinite loops
  answers: Record<string, string>;
  loading: boolean;
  error?: string;
  result?: SubmissionResult;
  resultLoading: boolean;
  resultError?: string;

  setEmail: (email: string) => void;
  setJobId: (jobId: string) => void;
  setAnswer: (qid: string, val: string) => void;
  startTest: (jobId: string, email?: string) => Promise<void>;
  submitTest: () => Promise<{ ok: boolean; message: string }>;
  getResults: () => Promise<{ ok: boolean; message: string }>;
  getAllAssignments: (email: string) => Promise<void>;
  reset: () => void;
};

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      email: "",
      jobId: "",
      assignment: undefined,
      assignments: [],
      assignmentsFetched: false,
      answers: {},
      loading: false,
      error: undefined,
      result: undefined,
      resultLoading: false,
      resultError: undefined,

      setEmail: (email) => set({ email, assignmentsFetched: false, assignments: [] }),
      setJobId: (jobId) => set({ jobId }),
      setAnswer: (qid: string, val: string) =>
        set((s) => ({ answers: { ...s.answers, [qid]: val } })),

      startTest: async (jobId, email) => {
        set({ loading: true, error: undefined, jobId });
        if (email) set({ email });

        try {
          const res = await fetch(
            `${API_BASE}/api/v1/assignment/jobs/${jobId}/start`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              cache: "no-store",
              body: JSON.stringify({ email }),
            }
          );

          // ✅ Special-case: already submitted
          if (res.status === 409) {
            set({ loading: false });
            // throw so callers (e.g., login page) do NOT proceed to /test
            set({
              loading: false,
              error: "Already submitted",
            });
          }

          const json = await res.json().catch(() => ({}));
          if (!res.ok || json?.success === false) {
            throw new Error(json?.message || "Failed to start test");
          }
          const assignment: Assignment = json?.data ?? json;
          set({
            assignment,
            loading: false,
            error: undefined,
            answers: {}, // fresh start
          });
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Failed to start test";
          set({
            loading: false,
            error: message,
          });
          throw e;
        }
      },

      submitTest: async () => {
        const { jobId, assignment, answers, email } = get();

        if (!jobId) {
          return { ok: false, message: "Missing job id" };
        }
        if (!assignment) {
          return { ok: false, message: "Assignment not loaded" };
        }

        // Build ordered list of required questionIds from the assignment
        const requiredIds = assignment.sections.flatMap((s) =>
          s.questions.map((q) => q.id)
        );

        // Normalize -> array of { questionId, answer } and check empties
        const answersPayload = requiredIds.map((qid) => {
          const val = (answers[qid] ?? "").toString().trim();
          return { questionId: qid, answer: val };
        });

        const missing = answersPayload
          .filter((a) => !a.answer)
          .map((a) => a.questionId);
        if (missing.length > 0) {
          return {
            ok: false,
            message: `Please answer all questions (${missing.length} remaining).`,
          };
        }

        try {
          const res = await fetch(
            `${API_BASE}/api/v1/assignment/jobs/${jobId}/submit`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ answers: answersPayload, email: email }),
            }
          );

          const json = await res.json().catch(() => ({}));
          if (!res.ok) {
            return { ok: false, message: json?.message || "Submission failed" };
          }
          return { ok: true, message: json?.message || "Submitted" };
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Submission failed";
          return { ok: false, message };
        }
      },

      getResults: async () => {
        const { jobId, email } = get();
        console.log("getResults: trying to fetch for", { jobId, email });
        if (!jobId || !email) {
          console.log("getResults: missing jobId or email");
          return { ok: false, message: "Missing job id or email" };
        }

        set({ resultLoading: true, resultError: undefined });
        try {
          const url = `${API_BASE}/api/v1/assignment/jobs/${jobId}/result`;
          console.log("getResults: fetching from URL:", url);
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const json = await res.json();
          console.log("getResults: API response JSON:", json);

          if (!res.ok) {
            throw new Error(json.message || "Failed to fetch results");
          }

          console.log("getResults: success, setting result in store");
          set({ result: json.data, resultLoading: false });
          return { ok: true, message: "Results loaded" };
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "Failed to fetch results";
          console.error("getResults: error fetching results:", message);
          set({ resultLoading: false, resultError: message });
          return { ok: false, message };
        }
      },

      getAllAssignments: async (email) => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch(
            `${API_BASE}/api/v1/assignment/my-assignments`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }
          );
          const json = await res.json();
          if (!res.ok) {
            throw new Error(json.message || "Failed to fetch assignments");
          }
          set({
            assignments: json.data,
            loading: false,
            assignmentsFetched: true,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "Failed to fetch assignments";
          set({ loading: false, error: message, assignmentsFetched: true });
          throw error;
        }
      },

      reset: () =>
        set({
          assignment: undefined,
          answers: {},
          loading: false,
          error: undefined,
          result: undefined,
          resultLoading: false,
          resultError: undefined,
        }),
    }),
    {
      name: "jf-test-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        email: s.email,
        jobId: s.jobId,
        assignment: s.assignment,
        answers: s.answers,
      }),
    }
  )
);
