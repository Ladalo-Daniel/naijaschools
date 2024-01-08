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
      articles: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          minutes_read: string | null
          tags: string | null
          title: string | null
          updated_at: string | null
          content_tags_title: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          minutes_read?: string | null
          tags?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          minutes_read?: string | null
          tags?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          faculty: string | null
          id: number
          institution: number | null
          name: string | null
          question_number: number | null
          total_marks: number | null
          name_code_description: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          faculty?: string | null
          id?: number
          institution?: number | null
          name?: string | null
          question_number?: number | null
          total_marks?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          faculty?: string | null
          id?: number
          institution?: number | null
          name?: string | null
          question_number?: number | null
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_institution_fkey"
            columns: ["institution"]
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
          logo: string | null
          motto: string | null
          name: string
          name_description: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          motto?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          motto?: string | null
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string
          id: number
          notification_type: string | null
          seen: boolean | null
          seen_at: string | null
          user: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          notification_type?: string | null
          seen?: boolean | null
          seen_at?: string | null
          user?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          notification_type?: string | null
          seen?: boolean | null
          seen_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          faculty: string | null
          id: string
          image: string | null
          institution: number | null
          location: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          faculty?: string | null
          id?: string
          image?: string | null
          institution?: number | null
          location?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          faculty?: string | null
          id?: string
          image?: string | null
          institution?: number | null
          location?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_institution_fkey"
            columns: ["institution"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["username"]
          }
        ]
      }
      questions: {
        Row: {
          answer: string | null
          course_id: number | null
          created_at: string
          explanation: string | null
          id: number
          marks: number | null
          option1: string | null
          option2: string | null
          option3: string | null
          option4: string | null
          question: string | null
        }
        Insert: {
          answer?: string | null
          course_id?: number | null
          created_at?: string
          explanation?: string | null
          id?: number
          marks?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          option4?: string | null
          question?: string | null
        }
        Update: {
          answer?: string | null
          course_id?: number | null
          created_at?: string
          explanation?: string | null
          id?: number
          marks?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          option4?: string | null
          question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      quizzes: {
        Row: {
          answers: Json | null
          course_id: number | null
          created_at: string
          duration: string | null
          id: number
          questions: Json | null
          total_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          course_id?: number | null
          created_at?: string
          duration?: string | null
          id?: number
          questions?: Json | null
          total_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          course_id?: number | null
          created_at?: string
          duration?: string | null
          id?: number
          questions?: Json | null
          total_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      replies: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          post: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          post?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          post?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["username"]
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
          student: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          marks?: number | null
          quiz?: number | null
          student?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          marks?: number | null
          quiz?: number | null
          student?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "results_student_fkey"
            columns: ["student"]
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
          faculty: string | null
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
          faculty?: string | null
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
          faculty?: string | null
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
      content_tags_title: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      name_code_description: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      name_description: {
        Args: {
          "": unknown
        }
        Returns: string
      }
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
