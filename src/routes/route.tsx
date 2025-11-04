import ProfilePage from '@/pages/ProfilePage';
import { JSX, lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const LoginSuccessPage = lazy(() => import('@/pages/LoginSuccessPage'));
const ClassIntroPage = lazy(() => import('@/pages/ClassIntroPage'));
const WorkspacePage = lazy(() => import('@/pages/WorkspacePage'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  layout: 'dashboard' | 'none' | 'workspace';
}

export const routes: AppRoute[] = [
  {
    path: '/login',
    element: <LoginPage />,
    layout: 'dashboard',
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    layout: 'dashboard',
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    layout: 'dashboard',
  },
  {
    path: '/class/:classId/intro',
    element: <ClassIntroPage />,
    layout: 'dashboard',
  },
  {
    path: '/login-success',
    element: <LoginSuccessPage />,
    layout: 'dashboard',
  },
  {
    path: '/workspaces/:workspaceId',
    element: <WorkspacePage />,
    layout: 'workspace',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    layout: 'dashboard',
  },
];
