import { useState } from "react";
import { userAuthService } from "../../api/services/auth/user.service";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userData) => {
    setLoading(true);
    try {
      const updatedUser = await userAuthService.updateUser(userData);
      setLoading(false);
      return updatedUser;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return { updateUser, loading, error };
};
