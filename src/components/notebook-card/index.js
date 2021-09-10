import './index.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const NotebookCard = ( { notebook, deleteFunction } ) => {
  return (
    <Grid
        item
        xs={ 10 }
        sm={ 6 }
        md={ 3 }
      >
        <Paper>
        <div className="NotebookCard">
          
          <h3>{ notebook.name }</h3>
          <p>Id: { notebook._id }</p>
          <p>Date: { notebook.date }</p>
          <Button
            variant="contained"
            color="primary"
            onClick={ deleteFunction }
          >
            Delete
          </Button>
          
        </div>
      </Paper>
    </Grid>
  );
};

export default NotebookCard;
