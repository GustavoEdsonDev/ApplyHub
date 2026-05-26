// Enums
export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type SeniorityLevel = 'internship' | 'junior' | 'mid_level' | 'senior';
export type ApplicationStatus = 'saved' | 'applied' | 'technical_test' | 'interview' | 'offer' | 'rejected';

// Database Types
export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  job_url: string | null;
  salary: number | null;
  salary_currency: string;
  work_mode: WorkMode;
  seniority: SeniorityLevel;
  status: ApplicationStatus;
  is_favorite: boolean;
  applied_at: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationStack {
  id: string;
  application_id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface ApplicationNote {
  id: string;
  application_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}
