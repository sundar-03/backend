import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import LandingPage from "./landingPage/landingPage";
import Footer from "./components/footer/footer";
import Navbar from './components/navbar/navbar';
import Register from './register/register'
import Login from './login/login'


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <LandingPage />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
      </Switch>
      
      <Footer />

    </Router>
     
    </>
  );
}

export default App;
