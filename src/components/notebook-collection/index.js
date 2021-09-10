import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Notebook from './../notebook';

const NotebookCollection = () => {
  const { user } = useContext( UserContext );

  const [ loading, setLoading ] = useState( false );
  const [ notebooks, setNotebooks ] = useState( [] );

  const fetchNotebooks = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notebooks?user=${user._id}`;
    const response = await fetch(urlAPI);
    const dataFromAPI = await response.json();
    const notebooksByUser = dataFromAPI.body;
    setNotebooks( notebooksByUser );
    setLoading( false );
  }, [ setNotebooks, user ] );

  useEffect( () => {
    setLoading( true );
    fetchNotebooks();
  }, [ fetchNotebooks ] );

  let content;
  if ( loading === true ) {
    content = <p className="loading">Loading...</p>;
  } else {
    if ( notebooks.length >= 1 ) {
      const notebooksMap = notebooks.map( ( element ) => {
        return ( <Notebook 
          key = { element._id }
          notebook = { element }
        /> );
      });

      content = (
        <Grid
          className="NotebooksContainer"
          container
          spacing={ 2 }
          justifyContent="center"
        >

          { notebooksMap }

        </Grid>
      );
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