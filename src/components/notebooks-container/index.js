import './index.css';
import Grid from '@material-ui/core/Grid';
import Notebook from './../notebook';

const NotebooksContainer = ( { notebooks } ) => {
  const notebooksMap = notebooks.map( ( element ) => {
    return ( <Notebook 
      key = { element._id }
      notebook = { element }
    /> );
  });

  return (
    <div className="NotebooksContainer">
      <Grid
        container
        spacing={ 2 }
        justifyContent="center"
      >

        { notebooksMap }

      </Grid>
    </div>
  );
};

export default NotebooksContainer;
