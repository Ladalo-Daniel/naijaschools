export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          code: string | null
          created_at: string
          "description ": string | null
          id: number
          "institution ": number | null
          "name ": string | null
          "question_number ": number | null
          total_marks: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          "description "?: string | null
          id?: number
          "institution "?: number | null
          "name "?: string | null
          "question_number "?: number | null
          total_marks?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          "description "?: string | null
          id?: number
          "institution "?: number | null
          "name "?: string | null
          "question_number "?: number | null
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_institution _fkey"
            columns: ["institution "]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          }
        ]
      }
      institutions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          "name ": string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          "name ": string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          "name "?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          "answer ": string | null
          course: number | null
          created_at: string
          id: number
          marks: number | null
          option1: string | null
          option2: string | null
          option3: string | null
          option4: string | null
        }
        Insert: {
          "answer "?: string | null
          course?: number | null
          created_at?: string
          id?: number
          marks?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          option4?: string | null
        }
        Update: {
          "answer "?: string | null
          course?: number | null
          created_at?: string
          id?: number
          marks?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          option4?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      results: {
        Row: {
          created_at: string
          date: string | null
          id: number
          marks: number | null
          quiz: number | null
          "student ": string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          marks?: number | null
          quiz?: number | null
          "student "?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          marks?: number | null
          quiz?: number | null
          "student "?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "results_student _fkey"
            columns: ["student "]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          bio: string | null
          community_id: string | null
          created_at: string
          dob: string | null
          email: string | null
          first_name: string | null
          id: string
          image_url: string | null
          institution: string | null
          last_name: string | null
          onboarded: boolean | null
          role: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          community_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          image_url?: string | null
          institution?: string | null
          last_name?: string | null
          onboarded?: boolean | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          community_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          image_url?: string | null
          institution?: string | null
          last_name?: string | null
          onboarded?: boolean | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
