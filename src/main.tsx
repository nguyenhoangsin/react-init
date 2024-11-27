import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, Slide } from 'react-toastify';
import { authLoader, loginLoader, changePasswordLoader } from './services/authService';
import store from './stores/store';
import Header from './views/components/Header/Header';
import App from './views/App';
import ErrorPage from './views/ErrorPage/ErrorPage';
import LoadingOverlay from './views/components/LoadingOverlay/LoadingOverlay';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const LoginPage = lazy(() => import('./views/LoginPage/LoginPage'));
const ChangePasswordPage = lazy(() => import('./views/ChangePasswordPage/ChangePasswordPage'));
const ForgotPasswordPage = lazy(() => import('./views/ForgotPasswordPage/ForgotPasswordPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: authLoader,
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
  {
    path: '/change-password',
    // loader: changePasswordLoader,
    element: (
      <Suspense fallback={<LoadingOverlay />}>
        <ChangePasswordPage />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<LoadingOverlay />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastContainer theme="light" autoClose={3000} transition={Slide} />
        <Header/>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
