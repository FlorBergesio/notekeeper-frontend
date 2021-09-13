import './index.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Note = ( props ) => {
    return (
        <div className="Note">
                <p>{ props.note.text }</p>
                <IconButton
                    aria-label="Edit"
                    onClick={ () => alert("edit") }
                    >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="Delete"
                    onClick={ () => alert("delete") }
                    >
                    <DeleteIcon />
                </IconButton>
        </div>
    );
  }
  
  export default Note;