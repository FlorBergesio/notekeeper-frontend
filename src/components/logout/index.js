import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Button from './../button';

const Logout = () => {
  const { setUser } = useContext( UserContext );

  const handleLogout = () => {
    setUser( {
      _id: null,
      name: null,
      username: null,
    } );
  };

  return (
    <div className="Logout">
      <Button
        text="Logout"
        handleClick={ handleLogout }
      />
    </div>
  );
}

export default Logout;