import { AuthStatus } from '@/enumeration/authStatus';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface UserDTO {
  sub: string;
  username: string;
  roles: string[];
  permissions: string[];
  avatar: string;
  name: string;
}

const axiosAuthClient = axios.create({
  baseURL: 'http://localhost:8072/auth-management/api',
  withCredentials: true,
});

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED);
  const [user, setUser] = useState<UserDTO>({
    name: 'No name',
    permissions: [],
    avatar: 'https://i.pravatar.cc/300',
    roles: [],
    sub: '',
    username: 'No name',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosAuthClient.get<UserDTO>('/my-info');
        setUser(res.data);
        setStatus(AuthStatus.AUTHENTICATED);
      } catch (error) {
        console.error('Auth failed', error);
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    };

    fetchUser();
  }, [navigate]);

  const isAuthenticated = () => {
    return status === AuthStatus.AUTHENTICATED;
  };

  const isNotAuthenticated = () => {
    return status === AuthStatus.UNAUTHENTICATED;
  };

  return {
    status,
    user,
    isAuthenticated,
  };
}
