import { apiService } from "../services/apiService";
import { AuthUserType } from "../types/user.types";

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  full_name?: string;
}

export const accountApi = {
  getUserProfile: async (): Promise<AuthUserType> => {
    const res = await apiService.get("/profile/me/");
    return res;
  },

  updateProfile: async (data: UpdateProfileData): Promise<AuthUserType> => {
    const res = await apiService.patch("/profile/me/", data);
    return res;
  },

  updateAvatar: async (formData: FormData): Promise<AuthUserType> => {
    const res = await apiService.patch("/profile/me/avatar/", formData);
    return res;
  },
};
