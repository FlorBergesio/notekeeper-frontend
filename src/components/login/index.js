import { useRef, useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'


const Login = () => {
  const { setUser } = useContext( UserContext );

  const [ userLogin, setUserLogin ] = useState({
    username: null,
    password: null
  });

  const [ error, setError ] = useState( false );

  const refUserInput = useRef( null );
  const refpasswordInput = useRef( null );

  const validateUser = useCallback( async () => {
    const urlAPI = `${process.env.REACT_APP_API_URL}/users/login`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": userLogin.username,
        "password": userLogin.password
      })
    };
    const response = await fetch(urlAPI, requestOptions);

    const dataFromAPI = await response.json();

    if ( dataFromAPI.body !== "" ) {
      const userLoggedIn = dataFromAPI.body;
      setUser({
        _id: userLoggedIn._id,
        name: userLoggedIn.name,
        username: userLoggedIn.username,
      });
    } else {
      setError( dataFromAPI.error );
    }
  }, [ userLogin, setUser ] );

  useEffect( () => {
    if ( userLogin.username !== null && userLogin.password !== null ) {
      validateUser();
    }    
  }, [ userLogin, validateUser ] );

  const handleFormSubmit = ( event ) => {
    event.preventDefault();
    const userInput = refUserInput.current.value;
    const passwordInput = refpasswordInput.current.value;

    setUserLogin({
      username: userInput,
      password: passwordInput
    });
  };

  return (
    <div className="Login">
      <h2>
        Login
      </h2>

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

      <a href="/register">Register</a>
    </div>
  );
}

export default Login;