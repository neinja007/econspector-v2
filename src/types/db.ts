export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  data: {
    Tables: {
      countries: {
        Row: {
          capital: string | null
          cca2: string
          cca3: string
          ccn3: string
          cioc: string | null
          full_name: string
          name: string
          world_bank: boolean
        }
        Insert: {
          capital?: string | null
          cca2: string
          cca3: string
          ccn3: string
          cioc?: string | null
          full_name: string
          name: string
          world_bank?: boolean
        }
        Update: {
          capital?: string | null
          cca2?: string
          cca3?: string
          ccn3?: string
          cioc?: string | null
          full_name?: string
          name?: string
          world_bank?: boolean
        }
        Relationships: []
      }
      countries_currencies: {
        Row: {
          country_code: string
          currency_code: string
        }
        Insert: {
          country_code: string
          currency_code: string
        }
        Update: {
          country_code?: string
          currency_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "countries_currencies_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["cca3"]
          },
          {
            foreignKeyName: "countries_currencies_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
        ]
      }
      currencies: {
        Row: {
          currency_code: string
          name: string
          symbol: string
          symbol_native: string
        }
        Insert: {
          currency_code: string
          name: string
          symbol: string
          symbol_native: string
        }
        Update: {
          currency_code?: string
          name?: string
          symbol?: string
          symbol_native?: string
        }
        Relationships: []
      }
      frequency_sources: {
        Row: {
          data_source: Database["data"]["Enums"]["data_source"] | null
          data_updated_at: string | null
          frequency_id: number | null
          id: number
          "wb-code": string | null
        }
        Insert: {
          data_source?: Database["data"]["Enums"]["data_source"] | null
          data_updated_at?: string | null
          frequency_id?: number | null
          id?: number
          "wb-code"?: string | null
        }
        Update: {
          data_source?: Database["data"]["Enums"]["data_source"] | null
          data_updated_at?: string | null
          frequency_id?: number | null
          id?: number
          "wb-code"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "frequency_sources_frequency_id_fkey"
            columns: ["frequency_id"]
            isOneToOne: false
            referencedRelation: "indicator_frequencies"
            referencedColumns: ["id"]
          },
        ]
      }
      indicator_frequencies: {
        Row: {
          frequency: Database["data"]["Enums"]["frequency"]
          id: number
          indicator_id: number | null
        }
        Insert: {
          frequency: Database["data"]["Enums"]["frequency"]
          id?: number
          indicator_id?: number | null
        }
        Update: {
          frequency?: Database["data"]["Enums"]["frequency"]
          id?: number
          indicator_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "indicator_frequencies_indicator_id_fkey"
            columns: ["indicator_id"]
            isOneToOne: false
            referencedRelation: "indicators"
            referencedColumns: ["id"]
          },
        ]
      }
      indicators: {
        Row: {
          chart_type: Database["data"]["Enums"]["chart_type"] | null
          code: string | null
          description: string | null
          id: number
          name: string
          parent_id: number | null
          unit: string | null
        }
        Insert: {
          chart_type?: Database["data"]["Enums"]["chart_type"] | null
          code?: string | null
          description?: string | null
          id?: number
          name: string
          parent_id?: number | null
          unit?: string | null
        }
        Update: {
          chart_type?: Database["data"]["Enums"]["chart_type"] | null
          code?: string | null
          description?: string | null
          id?: number
          name?: string
          parent_id?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "indicators_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "indicators"
            referencedColumns: ["id"]
          },
        ]
      }
      time_series_data: {
        Row: {
          country_code: string | null
          created_at: string
          id: number
          period: string | null
          source_id: number | null
          value: number
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          id?: number
          period?: string | null
          source_id?: number | null
          value: number
        }
        Update: {
          country_code?: string | null
          created_at?: string
          id?: number
          period?: string | null
          source_id?: number | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "world_bank_data_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["cca3"]
          },
          {
            foreignKeyName: "world_bank_data_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "frequency_sources"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_ranked_countries: {
        Args: {
          p_end_year: number
          p_level: string
          p_source_id: number
          p_start_year: number
        }
        Returns: Json
      }
    }
    Enums: {
      chart_type: "BAR" | "LINE" | "AREA"
      data_source:
        | "WORLD_BANK"
        | "IMF"
        | "UN_DATA"
        | "TRADING_ECONOMICS"
        | "OECD"
      frequency: "ANNUAL" | "BIANNUAL" | "MONTHLY" | "QUARTERLY"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  users: {
    Tables: {
      country_groups: {
        Row: {
          core: boolean
          created_at: string
          description: string | null
          id: number
          name: string
          user_id: string | null
        }
        Insert: {
          core?: boolean
          created_at?: string
          description?: string | null
          id?: number
          name: string
          user_id?: string | null
        }
        Update: {
          core?: boolean
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      country_groups_countries: {
        Row: {
          country_cca3: string
          created_at: string
          group_id: number
        }
        Insert: {
          country_cca3: string
          created_at?: string
          group_id?: number
        }
        Update: {
          country_cca3?: string
          created_at?: string
          group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "country_group_countries_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "country_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      indicator_groups: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      indicator_groups_indicators: {
        Row: {
          group_id: number
          indicator_id: number
        }
        Insert: {
          group_id?: number
          indicator_id: number
        }
        Update: {
          group_id?: number
          indicator_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "indicator_groups_indicators_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "indicator_groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_country_groups: {
        Args: { p_source_id: number; p_user_id: string }
        Returns: Json
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  data: {
    Enums: {
      chart_type: ["BAR", "LINE", "AREA"],
      data_source: [
        "WORLD_BANK",
        "IMF",
        "UN_DATA",
        "TRADING_ECONOMICS",
        "OECD",
      ],
      frequency: ["ANNUAL", "BIANNUAL", "MONTHLY", "QUARTERLY"],
    },
  },
  users: {
    Enums: {},
  },
} as const
