import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/navbar';
import Home from './components/pages/home';
import StudentState from './context/studentContext/StudentState';
import AuthState from './context/authContext/authState';
import Register from './components/pages/register';
import Login from './components/pages/login';
import PrivateRoute from './components/pages/routes/privateRoute';
import setToken from './utils/setToken';

if(localStorage.token){
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <StudentState>
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <PrivateRoute exact path = '/' component={Home} />
              <Route exact path = '/register' component={Register} />
              <Route exact path = '/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </StudentState>
    </AuthState>
  );
}

export default App;
