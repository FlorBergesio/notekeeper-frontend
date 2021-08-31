import './index.css';
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
      { notebooksMap }
    </div>
  );
};

export default NotebooksContainer;
