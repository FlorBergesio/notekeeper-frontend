import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Logout from './../logout';
import NotebooksContainer from '../notebooks-container';

const NotebookCollection = () => {
  const { user, setUser } = useContext( UserContext );

  const [ loading, setLoading ] = useState( false );
  //const [ dataRetrieved, setDataRetrieved ] = useState( [] );
  const [ notebooks, setNotebooks ] = useState( [] );

  useEffect( () => {
    setLoading( true );

    const fetchData = async () => {
      const urlAPI = "http://localhost:3000/users";
      const response = await fetch(urlAPI);
      const dataFromAPI = await response.json();
      const userList = dataFromAPI.body;

      if ( userList.length > 0 ) {
        const existingUser = userList.find( element => {
          return element.name === user.name;
        } );

        if ( existingUser ) {
          setUser( { ...user, _id: existingUser._id } );
          const fetchNotebooks = async ( existingUser ) => {
            const urlAPI = "http://localhost:3000/notebooks?user=" + existingUser._id;
            const response = await fetch(urlAPI);
            const dataFromAPI = await response.json();
            setNotebooks( dataFromAPI.body );
          };

          fetchNotebooks( existingUser );
        }
      }
    };
    
    fetchData();

    setLoading( false );
  }, [ setLoading, setNotebooks ] );

  return (
    <div className="NotebookCollection">
      <h2>
        { user.name }'{ ( user.name.slice(-1) !== 's' ) ? 's' : '' } Notebook Collection
      </h2>

      <Logout />

      { loading &&
        <p className="loading">Loading...</p>
      }

      { ( notebooks.length > 0 ) 
        ? <NotebooksContainer notebooks={ notebooks } />
        : `You don't have any notebooks.`
      }

    </div>
  );
}

export default NotebookCollection;