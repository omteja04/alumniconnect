export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            admin_analytics: {
                Row: {
                    created_at: string | null
                    date_recorded: string | null
                    id: string
                    metric_name: string
                    metric_value: number
                }
                Insert: {
                    created_at?: string | null
                    date_recorded?: string | null
                    id?: string
                    metric_name: string
                    metric_value: number
                }
                Update: {
                    created_at?: string | null
                    date_recorded?: string | null
                    id?: string
                    metric_name?: string
                    metric_value?: number
                }
                Relationships: []
            }
            admin_settings: {
                Row: {
                    created_at: string | null
                    id: string
                    setting_key: string
                    setting_value: Json
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    setting_key: string
                    setting_value: Json
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    setting_key?: string
                    setting_value?: Json
                    updated_at?: string | null
                }
                Relationships: []
            }
            alumni_profiles: {
                Row: {
                    availability_for_mentorship: boolean | null
                    certifications: Json | null
                    company: string | null
                    created_at: string | null
                    designation: string | null
                    domain: string | null
                    education_summary: string | null
                    experience_years: number | null
                    graduation_year: string | null
                    id: string
                    linkedin_url: string | null
                    location: string | null
                    profile_picture: string | null
                    resume_url: string | null
                    roll_number: string | null
                    skills: Json | null
                    success_story: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    availability_for_mentorship?: boolean | null
                    certifications?: Json | null
                    company?: string | null
                    created_at?: string | null
                    designation?: string | null
                    domain?: string | null
                    education_summary?: string | null
                    experience_years?: number | null
                    graduation_year?: string | null
                    id?: string
                    linkedin_url?: string | null
                    location?: string | null
                    profile_picture?: string | null
                    resume_url?: string | null
                    roll_number?: string | null
                    skills?: Json | null
                    success_story?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    availability_for_mentorship?: boolean | null
                    certifications?: Json | null
                    company?: string | null
                    created_at?: string | null
                    designation?: string | null
                    domain?: string | null
                    education_summary?: string | null
                    experience_years?: number | null
                    graduation_year?: string | null
                    id?: string
                    linkedin_url?: string | null
                    location?: string | null
                    profile_picture?: string | null
                    resume_url?: string | null
                    roll_number?: string | null
                    skills?: Json | null
                    success_story?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "alumni_profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            job_postings: {
                Row: {
                    company: string
                    description: string
                    domain: string | null
                    id: string
                    is_active: boolean | null
                    location: string | null
                    posted_at: string | null
                    posted_by: string | null
                    requirements: Json | null
                    salary_range: string | null
                    success_rate: number | null
                    title: string
                }
                Insert: {
                    company: string
                    description: string
                    domain?: string | null
                    id?: string
                    is_active?: boolean | null
                    location?: string | null
                    posted_at?: string | null
                    posted_by?: string | null
                    requirements?: Json | null
                    salary_range?: string | null
                    success_rate?: number | null
                    title: string
                }
                Update: {
                    company?: string
                    description?: string
                    domain?: string | null
                    id?: string
                    is_active?: boolean | null
                    location?: string | null
                    posted_at?: string | null
                    posted_by?: string | null
                    requirements?: Json | null
                    salary_range?: string | null
                    success_rate?: number | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "job_postings_posted_by_fkey"
                        columns: ["posted_by"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            mentorship_requests: {
                Row: {
                    alumni_id: string | null
                    alumni_response: string | null
                    created_at: string | null
                    id: string
                    message: string | null
                    status: Database["public"]["Enums"]["mentorship_status"] | null
                    student_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    alumni_id?: string | null
                    alumni_response?: string | null
                    created_at?: string | null
                    id?: string
                    message?: string | null
                    status?: Database["public"]["Enums"]["mentorship_status"] | null
                    student_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    alumni_id?: string | null
                    alumni_response?: string | null
                    created_at?: string | null
                    id?: string
                    message?: string | null
                    status?: Database["public"]["Enums"]["mentorship_status"] | null
                    student_id?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "mentorship_requests_alumni_id_fkey"
                        columns: ["alumni_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "mentorship_requests_student_id_fkey"
                        columns: ["student_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            messages: {
                Row: {
                    created_at: string
                    id: string
                    is_read: boolean | null
                    message: string
                    recipient_id: string
                    sender_id: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    is_read?: boolean | null
                    message: string
                    recipient_id: string
                    sender_id: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    is_read?: boolean | null
                    message?: string
                    recipient_id?: string
                    sender_id?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "messages_recipient_id_fkey"
                        columns: ["recipient_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "messages_sender_id_fkey"
                        columns: ["sender_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profile_approval_requests: {
                Row: {
                    admin_notes: string | null
                    current_data: Json | null
                    id: string
                    request_type: string
                    requested_at: string | null
                    requested_data: Json
                    reviewed_at: string | null
                    reviewed_by: string | null
                    status: string | null
                    user_id: string | null
                }
                Insert: {
                    admin_notes?: string | null
                    current_data?: Json | null
                    id?: string
                    request_type: string
                    requested_at?: string | null
                    requested_data: Json
                    reviewed_at?: string | null
                    reviewed_by?: string | null
                    status?: string | null
                    user_id?: string | null
                }
                Update: {
                    admin_notes?: string | null
                    current_data?: Json | null
                    id?: string
                    request_type?: string
                    requested_at?: string | null
                    requested_data?: Json
                    reviewed_at?: string | null
                    reviewed_by?: string | null
                    status?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profile_approval_requests_reviewed_by_fkey"
                        columns: ["reviewed_by"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "profile_approval_requests_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            referrals: {
                Row: {
                    alumni_id: string | null
                    alumni_response: string | null
                    created_at: string | null
                    id: string
                    job_id: string | null
                    message: string | null
                    status: Database["public"]["Enums"]["referral_status"] | null
                    student_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    alumni_id?: string | null
                    alumni_response?: string | null
                    created_at?: string | null
                    id?: string
                    job_id?: string | null
                    message?: string | null
                    status?: Database["public"]["Enums"]["referral_status"] | null
                    student_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    alumni_id?: string | null
                    alumni_response?: string | null
                    created_at?: string | null
                    id?: string
                    job_id?: string | null
                    message?: string | null
                    status?: Database["public"]["Enums"]["referral_status"] | null
                    student_id?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "referrals_alumni_id_fkey"
                        columns: ["alumni_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "referrals_job_id_fkey"
                        columns: ["job_id"]
                        isOneToOne: false
                        referencedRelation: "job_postings"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "referrals_student_id_fkey"
                        columns: ["student_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            student_profiles: {
                Row: {
                    address: string | null
                    certifications: Json | null
                    cgpa: number | null
                    created_at: string | null
                    current_education: string | null
                    gender: string | null
                    id: string
                    interests: Json | null
                    placement_readiness_score: number | null
                    profile_picture: string | null
                    resume_url: string | null
                    roll_number: string | null
                    skills: Json | null
                    updated_at: string | null
                    user_id: string | null
                    year: string | null
                }
                Insert: {
                    address?: string | null
                    certifications?: Json | null
                    cgpa?: number | null
                    created_at?: string | null
                    current_education?: string | null
                    gender?: string | null
                    id?: string
                    interests?: Json | null
                    placement_readiness_score?: number | null
                    profile_picture?: string | null
                    resume_url?: string | null
                    roll_number?: string | null
                    skills?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    year?: string | null
                }
                Update: {
                    address?: string | null
                    certifications?: Json | null
                    cgpa?: number | null
                    created_at?: string | null
                    current_education?: string | null
                    gender?: string | null
                    id?: string
                    interests?: Json | null
                    placement_readiness_score?: number | null
                    profile_picture?: string | null
                    resume_url?: string | null
                    roll_number?: string | null
                    skills?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    year?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "student_profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            support_tickets: {
                Row: {
                    admin_response: string | null
                    created_at: string | null
                    id: string
                    issue_description: string
                    status: Database["public"]["Enums"]["ticket_status"] | null
                    title: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    admin_response?: string | null
                    created_at?: string | null
                    id?: string
                    issue_description: string
                    status?: Database["public"]["Enums"]["ticket_status"] | null
                    title: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    admin_response?: string | null
                    created_at?: string | null
                    id?: string
                    issue_description?: string
                    status?: Database["public"]["Enums"]["ticket_status"] | null
                    title?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "support_tickets_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    created_at: string | null
                    department: string | null
                    email: string | null
                    full_name: string
                    id: string
                    role: Database["public"]["Enums"]["user_role"]
                    theme_preference:
                    | Database["public"]["Enums"]["theme_preference"]
                    | null
                }
                Insert: {
                    created_at?: string | null
                    department?: string | null
                    email?: string | null
                    full_name: string
                    id: string
                    role: Database["public"]["Enums"]["user_role"]
                    theme_preference?:
                    | Database["public"]["Enums"]["theme_preference"]
                    | null
                }
                Update: {
                    created_at?: string | null
                    department?: string | null
                    email?: string | null
                    full_name?: string
                    id?: string
                    role?: Database["public"]["Enums"]["user_role"]
                    theme_preference?:
                    | Database["public"]["Enums"]["theme_preference"]
                    | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            mentorship_status: "pending" | "accepted" | "rejected"
            referral_status: "pending" | "accepted" | "rejected"
            theme_preference: "light" | "dark"
            ticket_status: "open" | "in_progress" | "resolved"
            user_role: "student" | "alumni" | "admin"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            mentorship_status: ["pending", "accepted", "rejected"],
            referral_status: ["pending", "accepted", "rejected"],
            theme_preference: ["light", "dark"],
            ticket_status: ["open", "in_progress", "resolved"],
            user_role: ["student", "alumni", "admin"],
        },
    },
} as const
