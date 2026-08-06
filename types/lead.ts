import { LeadFormData } from "@/lib/zod";

export type { LeadFormData };

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  timestamp?: string;
}
