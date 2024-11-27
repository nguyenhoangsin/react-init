import { useState, ReactElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authProvider } from '../../services/authService';
import loadingService from '../../services/loadingService';
// import style from './HomePage.module.scss';
import MultiSelect, { Option } from "../components/MultiSelect/MultiSelect";

function HomePage(): ReactElement {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    setIsLoggingOut(true);
    await authProvider.signout();
    navigate('/login');
    setIsLoggingOut(false);
  };

  const [optionSelected, setSelected] = useState<Option[] | null>();
  const handleChange = (selected: Option[]) => {
    setSelected(selected);
  };
  const options = [
    { value: 0, label: "Goranboy" },
    { value: 1, label: "Safikurd" },
    { value: 2, label: "Baku" },
    { value: 3, label: "Ganja" },
    { value: 4, label: "Shusha" },
    { value: 5, label: "Agdam" },
  ];

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
    <MultiSelect
        key="example_id"
        options={options}
        onChange={handleChange}
        value={optionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />
    </>
  );
}

export default HomePage;
