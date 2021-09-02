import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login';
import NotebookCollection from './notebook-collection';
import Register from './register';


const App = () => {
  const { user } = useContext( UserContext );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notekeeper</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            { ( user.name === null ) 
              ? <Login />
              : <NotebookCollection />
            }
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
