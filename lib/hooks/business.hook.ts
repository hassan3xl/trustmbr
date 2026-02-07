import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { businessApi } from "../api/business.api";
import { BusinessInsert, BusinessUpdate } from "../types/business.types";

// Query hooks
export function useGetVerifiedBusinesses() {
  return useQuery({
    queryKey: ["verifiedBusinesses"],
    queryFn: () => businessApi.getVerifiedBusinesses(),
  });
}

export function useGetAllBusinesses() {
  return useQuery({
    queryKey: ["allBusinesses"],
    queryFn: () => businessApi.getAllBusinesses(),
  });
}

export function useGetMyBusinesses() {
  return useQuery({
    queryKey: ["myBusinesses"],
    queryFn: () => businessApi.getMyBusinesses(),
  });
}

export function useGetBusinessById(id: string) {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => businessApi.getBusinessById(id),
    enabled: !!id,
  });
}

// Alias for convenience
export const useBusiness = useGetBusinessById;

export function useGetIncomeRecords(businessId: string) {
  return useQuery({
    queryKey: ["incomeRecords", businessId],
    queryFn: () => businessApi.getIncomeRecords(businessId),
    enabled: !!businessId,
  });
}

// Mutation hooks
export function useCreateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (business: BusinessInsert) =>
      businessApi.createBusiness(business),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["verifiedBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["allBusinesses"] });
      toast.success("Business registered successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to register business");
    },
  });
}

export function useUpdateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BusinessUpdate }) =>
      businessApi.updateBusiness(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business", id] });
      queryClient.invalidateQueries({ queryKey: ["myBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["verifiedBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["allBusinesses"] });
      toast.success("Business updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update business");
    },
  });
}

export function useDeleteBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => businessApi.deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["verifiedBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["allBusinesses"] });
      toast.success("Business deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete business");
    },
  });
}

export function useUpdateBusinessStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      trustScore,
    }: {
      id: string;
      status: "pending" | "verified" | "unverified" | "rejected";
      trustScore?: number;
    }) => businessApi.updateBusinessStatus(id, status, trustScore),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business", id] });
      queryClient.invalidateQueries({ queryKey: ["allBusinesses"] });
      queryClient.invalidateQueries({ queryKey: ["verifiedBusinesses"] });
      toast.success("Business status updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });
}

export function useAddIncomeRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      amount,
      month,
    }: {
      businessId: string;
      amount: number;
      month: string;
    }) => businessApi.addIncomeRecord(businessId, amount, month),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["incomeRecords", businessId],
      });
      toast.success("Income record added");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add income record");
    },
  });
}
