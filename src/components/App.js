import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import './App.css';
import Login from './login';
import Logout from './logout';
import NotebookCollection from './notebook-collection';
import NoteCRUD from './note-crud';
import Register from './register';
import Error404 from './error404';
import Notebook from './notebook';
import Button from '@material-ui/core/Button';

const App = () => {
  const { user } = useContext( UserContext );
  const history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        { ( user._id !== null ) && 
          <Button
            variant="contained"
            color="secondary"
            onClick={ () => history.goBack() }
          >
            Back
          </Button>
        }

        <Link to="/"><h1>Notekeeper</h1></Link>

        { ( user._id !== null ) && 
          <Logout />
        }
      </header>
      
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/note/new">
          <NoteCRUD />
        </Route>
        <Route path="/notebook">
          <Notebook />
        </Route>
        <Route exact path="/">
          { ( user.name !== null ) 
            ? <NotebookCollection />
            : (
              <nav>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={'/'}
                >
                  Home
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={'/login'}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={'/register'}
                >
                  Register
                </Button>
              </nav>
            )
          }
        </Route>
        <Route component={ Error404 } />
      </Switch>
    </div>
  );
};

export default App;
