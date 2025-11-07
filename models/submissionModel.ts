export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id?: number;
  title: string;
  content: string;
  status: SubmissionStatus;
  created_at?: Date;
  last_updated?: Date;
  project_id: number;
}
