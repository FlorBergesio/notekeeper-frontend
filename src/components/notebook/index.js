import { useCallback, useContext, useEffect, useState } from 'react';
import { NotebookContext } from '../../context/NotebookContext';
import './index.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Note from '../note';

const Notebook = () => {
  const { notebook } = useContext( NotebookContext );

  //const [ alert, setAlert ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  const [ notes, setNotes ] = useState( [] );

  const fetchNotes = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notes?notebook=${notebook._id}`;
    /* const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "notebook": notebook._id,
        "text": 'text',
      })
    }; */
    // const response = await fetch(urlAPI, requestOptions);
    const response = await fetch(urlAPI);
    const dataFromAPI = await response.json();
    const notesByNotebook = dataFromAPI.body;
    setNotes( notesByNotebook.reverse() );
    setLoading( false );
  }, [ setNotes, notebook._id ] );

  useEffect( () => {
    setLoading( true );
    fetchNotes();
  }, [ fetchNotes ] );

  let content;
  if ( loading === true ) {
    content = <p className="loading">Loading...</p>;
  } else {
    if ( notes.length >= 1 ) {
      const notesMap = notes.map( ( element ) => {
        return (
          <Note note={ element } />
        );
      });

      content = (
        <div
          className="NotesContainer"
        >

          { notesMap }

        </div>
      );
    } else {
      content = <p>You don't have any notes.</p>;
    }
  }

  return (
    <div className="Notebook">
      <h2>
        { notebook.name }
      </h2>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={'/note/new'}
      >
        New
      </Button>

      { alert &&
        <p>{ alert }</p>
      }

      { content }
      
    </div>
  );
};

export default Notebook;
