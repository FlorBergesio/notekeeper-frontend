import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './App.css';
import Login from './login';
import NotebookCollection from './notebook-collection';

const App = () => {
  const { user } = useContext( UserContext );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notekeeper</h1>
      </header>

      { ( user.name === null ) 
        ? <Login />
        : <NotebookCollection />
      }

    </div>
  );
};

export default App;
