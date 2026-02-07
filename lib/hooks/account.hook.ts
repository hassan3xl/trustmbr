import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountApi } from "../api/account.api";

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => accountApi.getUserProfile(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
