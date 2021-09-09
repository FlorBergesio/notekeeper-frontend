import './index.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Notebook = ( { notebook } ) => {
  return (
    <Grid
        item
        xs={ 10 }
        sm={ 6 }
        md={ 3 }
      >
        <Paper>
        <div className="Notebook">
          
          <h3>{ notebook.name }</h3>
          <p>Id: { notebook._id }</p>
          <p>Date: { notebook.date }</p>
          
        </div>
      </Paper>
    </Grid>
  );
};

export default Notebook;
