import { useEffect, useState } from "react";
import { userService } from "../api/services/user.service";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      userService.getUsers().then((data) => {
        setUsers(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error };
};
