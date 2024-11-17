import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { authLoader, loginLoader } from './services/authService';
import store from './stores/store';
import './styles/index.scss';
import App from './views/App';
import ErrorPage from './views/ErrorPage/ErrorPage';
import LoadingOverlay from './views/components/LoadingOverlay/LoadingOverlay';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const LoginPage = lazy(() => import('./views/LoginPage/LoginPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    loader: loginLoader,
    element: (
      <Suspense fallback={<LoadingOverlay />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
