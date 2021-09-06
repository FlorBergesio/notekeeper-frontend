import { useRef, useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { Redirect } from "react-router-dom";

const Register = () => {
  const { user, setUser } = useContext( UserContext );

  const [ userRegister, setUserRegister ] = useState({
      username: null,
      name: null,
      password: null
  });

  const refUserInput = useRef( null );
  const refNameInput = useRef( null );
  const refpasswordInput = useRef( null );

  const [ error, setError ] = useState( false );

  const validateUser = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/users/`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": userRegister.username,
        "name": userRegister.name,
        "password": userRegister.password
      })
    };
    const response = await fetch(urlAPI, requestOptions);

    const dataFromAPI = await response.json();

    if ( dataFromAPI.body !== "" ) {
      const userRegistered = dataFromAPI.body;
      setUser({
          _id: userRegistered._id,
          name: userRegistered.name,
          username: userRegistered.username,
      });
    } else {
      setError( dataFromAPI.error );
    }
  }, [ userRegister, setUser ] );

  useEffect( () => {
    if ( userRegister.username !== null && userRegister.name !== null && userRegister.password !== null ) {
      validateUser();
    }
  }, [ userRegister, validateUser ] );

  useEffect( () => {
    if ( userRegister.username !== null && userRegister.name !== null && userRegister.password !== null ) {
      validateUser();
    }
  }, [ userRegister, validateUser ] );

  const handleFormSubmit = ( event ) => {
    event.preventDefault();
    const userInput = refUserInput.current.value;
    const nameInput = refNameInput.current.value;
    const passwordInput = refpasswordInput.current.value;

    setError( false );

    setUserRegister({
      username: userInput,
      name: nameInput,
      password: passwordInput
    });
  };

  if ( user.username !== null ) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h2>Register</h2>

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
              label="Username"
              placeholder="Your username"
              inputRef={refUserInput}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="filled"
              color="primary"
              label="Name"
              placeholder="Your name"
              inputRef={refNameInput}
            />
          </Grid>
          
          <Grid item>
            <TextField
              variant="filled"
              color="primary"
              type="password"
              label="Password"
              placeholder="Your password"
              inputRef={refpasswordInput}
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
  )
}

export default Register
