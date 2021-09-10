import { useContext, useState } from 'react';
import { NotebookContext } from '../../context/NotebookContext';
import './index.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Notebook = () => {
  const { notebook } = useContext( NotebookContext );

  const [ alert, setAlert ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  const [ notes, setNotes ] = useState( [] );

  let content;
  if ( loading === true ) {
    content = <p className="loading">Loading...</p>;
  } else {
    if ( notes.length >= 1 ) {
      const notesMap = notes.map( ( element ) => {
        return ( <p>{ element._id }</p>);
      });

      content = (
        <Grid
          className="NotesContainer"
          container
          spacing={ 2 }
          justifyContent="center"
        >

          { notesMap }

        </Grid>
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
