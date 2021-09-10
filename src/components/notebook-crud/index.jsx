import { useRef, useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import { Redirect } from "react-router-dom";
import './index.css';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

const NotebookCRUD = () => {
  const { user } = useContext( UserContext );

  const [ newNotebook, setNewNotebook ] = useState({
    user: null,
    name: null
  });
  
  const [ error, setError ] = useState( false );
  const [ creationSuccessfull, setCreationSuccessfull ] = useState( false );
  const [ actionInProgress, setActionInProgress ] = useState( false );

  const refNameInput = useRef( null );

  const validateNotebook = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notebooks/`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user": user._id,
        "name": newNotebook.name
      })
    };
    const response = await fetch(urlAPI, requestOptions);

    const dataFromAPI = await response.json();

    if ( dataFromAPI.body !== "" ) {
      setCreationSuccessfull( true );
    } else {
      setError( dataFromAPI.error );
    }
  }, [ newNotebook.name, setCreationSuccessfull, user._id ] );

  useEffect( () => {
    if ( newNotebook.name !== null && !actionInProgress ) {
      setActionInProgress( true );
      validateNotebook()
        .then( setActionInProgress( false ) );
    }
  }, [ newNotebook.name, validateNotebook, actionInProgress ] );

  const handleFormSubmit = ( event ) => {
    event.preventDefault();
    const nameInput = refNameInput.current.value;

    setError( false );

    setNewNotebook({
      user: user._id,
      name: nameInput
    });
  };

  if ( creationSuccessfull ) {
    return <Redirect to='/' />;
  }

  return (
    <div className="NotebookCRUD">
      <h2>New Notebook</h2>

      <form onSubmit={ handleFormSubmit }>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"          
        >

          <Grid item>
            <TextField
              variant="filled"
              color="primary"
              label="Name"
              placeholder="Your name"
              inputRef={refNameInput}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
          
        </Grid>
        
      </form>

      { error &&
        <p>{ error }</p>
      }
    </div>
  );
};

export default NotebookCRUD;
