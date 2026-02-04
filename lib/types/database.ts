// Database types for Supabase
// Auto-generated types - run `npx supabase gen types typescript` to update

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BusinessStatus = "pending" | "verified" | "unverified" | "rejected";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          industry: string;
          location: string;
          address: string;
          email: string;
          phone: string;
          website: string | null;
          registration_number: string;
          logo_url: string | null;
          status: BusinessStatus;
          trust_score: number;
          verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          industry: string;
          location: string;
          address: string;
          email: string;
          phone: string;
          website?: string | null;
          registration_number: string;
          logo_url?: string | null;
          status?: BusinessStatus;
          trust_score?: number;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          description?: string | null;
          industry?: string;
          location?: string;
          address?: string;
          email?: string;
          phone?: string;
          website?: string | null;
          registration_number?: string;
          logo_url?: string | null;
          status?: BusinessStatus;
          trust_score?: number;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      income_records: {
        Row: {
          id: string;
          business_id: string;
          amount: number;
          month: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          amount: number;
          month: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          amount?: number;
          month?: string;
          created_at?: string;
        };
      };
    };
    Enums: {
      business_status: BusinessStatus;
    };
  };
}

// Convenience types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Business = Database["public"]["Tables"]["businesses"]["Row"];
export type IncomeRecord =
  Database["public"]["Tables"]["income_records"]["Row"];

export type BusinessInsert =
  Database["public"]["Tables"]["businesses"]["Insert"];
export type BusinessUpdate =
  Database["public"]["Tables"]["businesses"]["Update"];
