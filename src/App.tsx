import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'tippy.js/dist/tippy.css';
import './i18n';
import DashboardLayoutBasic from '@/layout/DashboardLayoutBasic';
import { routes } from '@/routes/route';
import ClassroomLayout from '@/layout/ClassroomLayout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppInitializer } from './components/AppInitializer';
import { JSX } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, element, layout }) => {
              const wrapped = wrapWithLayout(layout, element);
              return <Route key={path} path={path} element={wrapped} />;
            })}
          </Routes>
        </BrowserRouter>
      </AppInitializer>
    </QueryClientProvider>
  );
}

function wrapWithLayout(layout: string | undefined, element: JSX.Element): JSX.Element {
  switch (layout) {
    case 'dashboard':
      return <DashboardLayoutBasic>{element}</DashboardLayoutBasic>;
    case 'classroom':
      return <ClassroomLayout>{element}</ClassroomLayout>;
    default:
      return <>{element}</>;
  }
}

export default App;
