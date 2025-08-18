export interface QuestionOptionDTO {
  key: string;
  text: string;
}
export interface QuestionDTO {
  id: string;
  prompt: string;
  options?: QuestionOptionDTO[];
}

export type SectionType =
  | "multiple-choice"
  | "short-answer"
  | "practical"
  | "roleplay";

export interface SectionDTO {
  title: string;
  type: SectionType;
  pointsPerQuestion: number;
  questions: QuestionDTO[];
}

export interface AssignmentDTO {
  jobId: string; // may be ObjectId string from API
  title: string;
  passingScore: number;
  sections: SectionDTO[];
}

export type SubmitResult = {
  ok: boolean;
  message?: string;
  score?: number | null;
  nextUrl?: string | null;
};
