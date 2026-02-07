import { apiService } from "../services/apiService";

export const accountApi = {
  getUserProfile: async () => {
    const res = await apiService.get("/profile/me/");
    return res;
  },
};
