import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useStoreSelector } from '../stores/store';
import { isLoadingSelector } from '../stores/loadingOverlaySlice';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
// import style from './App.module.scss';

function App(): ReactElement {
  const isLoading: boolean = useStoreSelector(isLoadingSelector);

  return (
    <>
      <LoadingOverlay isShow={isLoading} />
      <Outlet />
    </>
  );
}

export default App;
