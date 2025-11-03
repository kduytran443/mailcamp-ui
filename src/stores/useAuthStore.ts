import { AuthStatus } from '@/enumeration/authStatus';
import { UserDto } from '@/models/user.type';
import { create } from 'zustand';

interface AuthState {
  user: UserDto | null;
  status: AuthStatus;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: AuthStatus.UNAUTHENTICATED,
  setUser: (user) =>
    set({
      user,
      status: user ? AuthStatus.AUTHENTICATED : AuthStatus.UNAUTHENTICATED,
    }),
  logout: () => set({ user: null, status: AuthStatus.UNAUTHENTICATED }),
}));
