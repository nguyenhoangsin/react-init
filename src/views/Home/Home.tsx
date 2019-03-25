import { useState, ReactElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authProvider } from '../../services/authService';
import loadingService from '../../services/loadingService';
// import style from './Home.module.scss';

function Home(): ReactElement {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    setIsLoggingOut(true);
    await authProvider.signout();
    navigate('/login');
    setIsLoggingOut(false);
  };

  return (
    <>
      <h1>Home Page - USER: {authProvider.username}</h1>
      <Link to="/login">Go to login</Link>
      <button type="submit" disabled={isLoggingOut} onClick={onLogoutClick}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
      <div>
      <button onClick={() => {
        loadingService.showLoading();
        setTimeout(() => {
          loadingService.hideLoading();
        }, 2000);
      }}>Show Loading</button>
    </div>
    </>
  );
}

export default Home;
