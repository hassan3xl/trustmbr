// Business types for Django backend

export type BusinessStatus = "pending" | "verified" | "rejected";

export interface BusinessType {
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
  logo: string | null;
  status: BusinessStatus;
  trust_score: number;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessInsert {
  name: string;
  description?: string;
  industry: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  registration_number: string;
  logo?: string;
}

export interface BusinessUpdate {
  name?: string;
  description?: string | null;
  industry?: string;
  location?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string | null;
  registration_number?: string;
  logo?: string | null;
  status?: BusinessStatus;
  trust_score?: number;
  verified_at?: string | null;
}

export interface IncomeRecord {
  id: string;
  business_id: string;
  amount: number;
  month: string;
  created_at: string;
}

export type BusinessResult = {
  success: boolean;
  data?: BusinessType;
  error?: string;
};

export type BusinessListResult = {
  success: boolean;
  data?: BusinessType[];
  error?: string;
};
