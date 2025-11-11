export interface Comment {
  id?: number;
  content: string;
  created_at?: Date;
  last_updated?: Date;
  submission_id: number;
}
