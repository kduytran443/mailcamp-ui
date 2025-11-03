import { AuthStatus } from '@/enumeration/authStatus';
import { useAuth } from '@/hooks/useAuth';

export default function UnauthenticatedOnly({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();

  if (status === AuthStatus.AUTHENTICATED) {
    return <></>;
  }

  return <>{children}</>;
}
