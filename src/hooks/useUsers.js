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

export const useUserById = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      userService.getUserById(id).then((data) => {
        setUser(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { user, loading, error };
};

export const useUserByRole = (role) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      userService.getUserByRole(role).then((data) => {
        setUsers(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [role]);

  return { users, loading, error };
};
