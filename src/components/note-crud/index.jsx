import { useRef, useContext, useState, useEffect, useCallback } from 'react';
import { NotebookContext } from '../../context/NotebookContext';
import { Redirect } from "react-router-dom";
import './index.css';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

const NoteCRUD = () => {
  const { notebook } = useContext( NotebookContext );

  const [ newNote, setNewNote ] = useState({
    notebook: null,
    text: null
  });
  
  const [ error, setError ] = useState( false );
  const [ creationSuccessfull, setCreationSuccessfull ] = useState( false );
  const [ actionInProgress, setActionInProgress ] = useState( false );

  const refTextInput = useRef( null );

  const validateNote = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notes/`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "notebook": notebook._id,
        "text": newNote.text
      })
    };
    const response = await fetch(urlAPI, requestOptions);

    const dataFromAPI = await response.json();

    console.log({
      "notebook": notebook._id,
      "text": newNote.text
    });

    if ( dataFromAPI.body !== "" ) {
      setCreationSuccessfull( true );
    } else {
      setError( dataFromAPI.error );
    }
  }, [ newNote.text, setCreationSuccessfull, notebook._id ] );

  useEffect( () => {
    if ( newNote.text !== null && notebook._idt !== null && !actionInProgress ) {
      setActionInProgress( true );
      validateNote()
        .then( setActionInProgress( false ) );
    }
  }, [ newNote.text, notebook._id, validateNote, actionInProgress ] );

  const handleFormSubmit = ( event ) => {
    event.preventDefault();
    const textInput = refTextInput.current.value;

    setError( false );

    setNewNote({
      notebook: notebook._id,
      text: textInput
    });
  };

  if ( creationSuccessfull ) {
    return <Redirect to='/notebook' />;
  }

  return (
    <div className="NoteCRUD">
      <h2>New Note</h2>

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
              label="Text"
              placeholder="Your text"
              inputRef={refTextInput}
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

export default NoteCRUD;
