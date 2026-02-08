import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountApi, UpdateProfileData } from "../api/account.api";

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => accountApi.getUserProfile(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => accountApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => accountApi.updateAvatar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Avatar updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update avatar");
    },
  });
}
