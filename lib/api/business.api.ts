import { apiService } from "../services/apiService";
import {
  BusinessType,
  BusinessInsert,
  BusinessUpdate,
} from "../types/business.types";

export const businessApi = {
  // Get all verified businesses (public)
  getVerifiedBusinesses: async (): Promise<BusinessType[]> => {
    const res = await apiService.get("/businesses/verified/");
    return res;
  },

  // Get all businesses (admin only)
  getAllBusinesses: async (): Promise<BusinessType[]> => {
    const res = await apiService.get("/businesses/");
    return res;
  },

  // Get user's own businesses
  getMyBusinesses: async (): Promise<BusinessType[]> => {
    const res = await apiService.get("/user/businesses/");
    return res;
  },

  // Get single business by ID
  getBusinessById: async (id: string): Promise<BusinessType> => {
    const res = await apiService.get(`/user/businesses/${id}/`);
    return res;
  },

  // Create new business
  createBusiness: async (business: BusinessInsert): Promise<BusinessType> => {
    const res = await apiService.post("/user/businesses/", business);
    return res;
  },

  // Update business
  updateBusiness: async (
    id: string,
    updates: BusinessUpdate,
  ): Promise<BusinessType> => {
    const res = await apiService.patch(`/user/businesses/${id}/`, updates);
    return res;
  },

  // Delete business
  deleteBusiness: async (id: string): Promise<void> => {
    await apiService.delete(`/user/businesses/${id}/`);
  },

  // Update business status (admin only)
  updateBusinessStatus: async (
    id: string,
    status: "pending" | "verified" | "unverified" | "rejected",
    trustScore?: number,
  ): Promise<BusinessType> => {
    const updates: any = { status };
    if (trustScore !== undefined) {
      updates.trust_score = trustScore;
    }
    if (status === "verified") {
      updates.verified_at = new Date().toISOString();
    }
    const res = await apiService.patch(`/businesses/${id}/`, updates);
    return res;
  },

  // Get income records for a business
  getIncomeRecords: async (businessId: string) => {
    const res = await apiService.get(
      `/businesses/${businessId}/income-records/`,
    );
    return res;
  },

  // Add income record
  addIncomeRecord: async (
    businessId: string,
    amount: number,
    month: string,
  ) => {
    const res = await apiService.post(
      `/businesses/${businessId}/income-records/`,
      {
        amount,
        month,
      },
    );
    return res;
  },
};
