"use server";

import { createClient } from "@/lib/services/supabase/server";
import { revalidatePath } from "next/cache";

export type BusinessStatus = "pending" | "verified" | "unverified" | "rejected";

export interface Business {
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
  logo_url?: string;
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
  logo_url?: string | null;
  status?: BusinessStatus;
  trust_score?: number;
  verified_at?: string | null;
}

export type BusinessResult = {
  success: boolean;
  data?: Business;
  error?: string;
};

export type BusinessListResult = {
  success: boolean;
  data?: Business[];
  error?: string;
};

// Get all verified businesses (public)
export async function getVerifiedBusinesses(): Promise<BusinessListResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "verified")
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Get all businesses (admin only)
export async function getAllBusinesses(): Promise<BusinessListResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Get user's own businesses
export async function getMyBusinesses(): Promise<BusinessListResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Get single business by ID
export async function getBusinessById(id: string): Promise<BusinessResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Create new business
export async function createBusiness(
  business: Omit<BusinessInsert, "owner_id">,
): Promise<BusinessResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("businesses")
    .insert({
      ...business,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/businesses");
  revalidatePath("/admin");

  return { success: true, data };
}

// Update business
export async function updateBusiness(
  id: string,
  updates: BusinessUpdate,
): Promise<BusinessResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/businesses");
  revalidatePath(`/businesses/${id}`);
  revalidatePath("/admin");

  return { success: true, data };
}

// Delete business
export async function deleteBusiness(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("businesses").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/businesses");
  revalidatePath("/admin");

  return { success: true };
}

// Update business status (admin only)
export async function updateBusinessStatus(
  id: string,
  status: "pending" | "verified" | "unverified" | "rejected",
  trustScore?: number,
): Promise<BusinessResult> {
  const supabase = await createClient();

  const updates: BusinessUpdate = {
    status,
    verified_at: status === "verified" ? new Date().toISOString() : null,
  };

  if (trustScore !== undefined) {
    updates.trust_score = trustScore;
  }

  const { data, error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/businesses");
  revalidatePath(`/businesses/${id}`);
  revalidatePath("/admin");

  return { success: true, data };
}

// Get income records for a business
export async function getIncomeRecords(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("income_records")
    .select("*")
    .eq("business_id", businessId)
    .order("month", { ascending: true });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Add income record
export async function addIncomeRecord(
  businessId: string,
  amount: number,
  month: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("income_records")
    .upsert(
      {
        business_id: businessId,
        amount,
        month,
      },
      { onConflict: "business_id,month" },
    )
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/businesses/${businessId}`);

  return { success: true, data };
}
