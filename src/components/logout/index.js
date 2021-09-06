import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Button from '@material-ui/core/Button'

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
        variant="contained"
        color="primary"
        onClick={ handleLogout }
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;