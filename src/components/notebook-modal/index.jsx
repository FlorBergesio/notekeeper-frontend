import { useCallback, useContext, useState, useRef, useEffect } from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../context/UserContext';

const NotebookModal = ( props ) => {
    const { user } = useContext( UserContext );

    const [ notebook, setNotebook ] = useState( {
        user: null,
        name: null
    } );
    const [ open, setOpen ] = useState( false );

    const refNotebookInput = useRef( null );

    const createNotebook = useCallback( async () => {
        const urlAPI = `${process.env.REACT_APP_API_URL}/notebooks/`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user": notebook.user,
                "name": notebook.name
            })
        };
        const response = await fetch(urlAPI, requestOptions);

        const dataFromAPI = await response.json();

        if ( dataFromAPI.body !== "" ) {
            props.onNotebookCreation();
        }
    }, [ props, notebook ] );

    useEffect( () => {
        if ( notebook.user !== null && notebook.name !== null ) {
            createNotebook();
        }
    }, [ notebook, createNotebook ] );

    const handleClickOpen = () => {
        setOpen( true );
    };

    const handleClose = () => {
        setOpen( false );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const notebookInput = refNotebookInput.current.value;
        setNotebook({
            user: user._id,
            name: notebookInput
        });
        handleClose();
    }
    
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={ handleClickOpen }
            >
                Add new
            </Button>

            <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-new-notebook">
              <DialogTitle id="form-dialog-new-notebook">New Notebook</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add a new notebook
                </DialogContentText>
                <TextField
                  id="notebook-name"
                  label="Name"
                  placeholder="To Do's"
                  inputRef={ refNotebookInput }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleClose } color="default">
                  Cancel
                </Button>
                <Button onClick={ handleSubmit } color="primary">
                  Add new
                </Button>
              </DialogActions>
            </Dialog>
        </>
    );
};

export default NotebookModal;