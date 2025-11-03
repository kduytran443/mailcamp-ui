import { AuthStatus } from '@/enumeration/authStatus';
import { useAuth } from '@/hooks/useAuth';

export default function AuthenticatedOnly({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();

  if (status === AuthStatus.UNAUTHENTICATED) {
    return <></>;
  }

  return <>{children}</>;
}
