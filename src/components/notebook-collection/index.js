import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import NotebooksContainer from '../notebooks-container';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const NotebookCollection = () => {
  const { user } = useContext( UserContext );

  const [ loading, setLoading ] = useState( false );
  const [ notebooks, setNotebooks ] = useState( [] );
  const [ successMessage, setSuccessMessage ] = useState("");

  const fetchNotebooks = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notebooks?user=${user._id}`;
    const response = await fetch(urlAPI);
    const dataFromAPI = await response.json();
    const notebooksByUser = dataFromAPI.body;
    setNotebooks( notebooksByUser );
    setLoading( false );
  }, [ successMessage, setNotebooks, user ] );

  useEffect( () => {
    setLoading( true );
    fetchNotebooks();
  }, [ successMessage, fetchNotebooks ] );

  const handleNotebookCreation = () => {
    setSuccessMessage("Success");
  };

  let content;
  if ( loading === true ) {
    content = <p className="loading">Loading...</p>;
  } else {
    if ( notebooks.length >= 1 ) {
      content = <NotebooksContainer notebooks={ notebooks } />;
    } else {
      content = <p>You don't have any notebooks.</p>;
    }
  }

  let notebookCollectionTitle;
  if ( user.name ) {
    notebookCollectionTitle = `${ user.name }'${ ( user.name.slice(-1) !== 's' ) ? 's' : '' }`;
  } else {
    notebookCollectionTitle = "Your";
  }

  return (
    <div className="NotebookCollection">
      <h2>
        { notebookCollectionTitle } Notebook Collection
      </h2>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        component={Link}
        to={'/notebook'}
      >
        New
      </Button>

      { content }
      
    </div>
  );
}

export default NotebookCollection;