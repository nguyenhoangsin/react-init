import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { authLoader, loginLoader } from './services/authService';
import store from './stores/store';
import './styles/index.scss';
import App from './views/App';
import Error404 from './views/Error404/Error404';
import LoadingOverlay from './views/components/LoadingOverlay/LoadingOverlay';

const Home = lazy(() => import('./views/Home/Home'));
const Login = lazy(() => import('./views/Login/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Home />
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
        <Login />
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
  </StrictMode>,
);
