import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Logout from './../logout';

const NotebookCollection = () => {
  const { user } = useContext( UserContext );

  return (
    <div className="NotebookCollection">
      <h2>
        { user.name }'{ ( user.name.slice(-1) !== 's' ) ? 's' : '' } Notebook Collection
      </h2>

      <Logout />
    </div>
  );
}

export default NotebookCollection;