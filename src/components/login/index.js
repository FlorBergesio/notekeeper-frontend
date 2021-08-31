import { useRef, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './index.css';
import Button from './../button';

const Login = () => {
  const { user, setUser } = useContext( UserContext );

  const refUserInput = useRef( null );

  const handleFormSubmit = ( event ) => {
    event.preventDefault();
    const userInput = refUserInput.current.value;
    setUser( { ...user, name: userInput } );
  };

  return (
    <div className="Login">
      <h2>
        Login
      </h2>

      <form onSubmit={ handleFormSubmit }>
        <label htmlFor="userInput">Name:</label>
        <input 
          type="text" 
          id="userInput" 
          placeholder="Your name"
          ref={refUserInput}
        />
        <Button
          type="Submit"
          text="Login"
        />
      </form>
    </div>
  );
}

export default Login;