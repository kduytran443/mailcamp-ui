import ProfilePage from '@/pages/ProfilePage';
import { JSX, lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const LoginSuccessPage = lazy(() => import('@/pages/LoginSuccessPage'));
const ClassIntroPage = lazy(() => import('@/pages/ClassIntroPage'));
const ClassroomPage = lazy(() => import('@/pages/ClassroomPage'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  layout: 'dashboard' | 'none' | 'classroom';
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
    path: '/classroom',
    element: <ClassroomPage />,
    layout: 'classroom',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    layout: 'dashboard',
  },
];
