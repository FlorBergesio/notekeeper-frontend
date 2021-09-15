import { useCallback, useContext, useEffect, useState } from 'react';
import { NotebookContext } from '../../context/NotebookContext';
import './index.css';
import Button from '@material-ui/core/Button';
import Note from '../note';
import NotebookCRUD from '../notebook-crud';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

const Notebook = () => {
  const { notebook } = useContext( NotebookContext );
  const { path } = useRouteMatch();

  const [ alert, setAlert ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  const [ notes, setNotes ] = useState( [] );

  const fetchNotes = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notes?notebook=${notebook._id}`;
    const response = await fetch(urlAPI);
    const dataFromAPI = await response.json();
    const notesByNotebook = dataFromAPI.body;
    if ( notesByNotebook.length > 0 ) {
      setNotes( notesByNotebook.reverse() );
    }
    setLoading( false );
  }, [ setNotes, notebook._id ] );

  useEffect( () => {
    setLoading( true );
    fetchNotes();
  }, [ fetchNotes, alert ] );

  const handleDeleteNote = async ( note_id ) => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/notes/${note_id}`;
    const requestOptions = {
      method: 'DELETE'
    };
    const response = await fetch(urlAPI, requestOptions);
    const dataFromAPI = await response.json();
    if ( dataFromAPI.body !== "" ) {
      setAlert( dataFromAPI.body );
    } else {
      setAlert( dataFromAPI.error );
    }
  };

  let content;
  if ( loading === true ) {
    content = <p className="loading">Loading...</p>;
  } else {
    if ( notes.length >= 1 ) {
      const notesMap = notes.map( ( element ) => {
        return (
          <Note
            key = { element._id }
            note={ element }
            handleDeleteNote = { () => handleDeleteNote( element._id ) }
          />
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
    <Switch>
      <Route exact path={`${path}/new`}>
        <NotebookCRUD />
      </Route>
      <Route exact path={path} >
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
      </Route>
    </Switch>
  );
};

export default Notebook;
