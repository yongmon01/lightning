import React from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from '../src/components/views/LandingPage/LandingPage';
import Footer from '../src/components/views/Footer/Footer';
import LoginPage from '../src/components/views/LoginPage/LoginPage';
import NavBar from '../src/components/views/NavBar/NavBar';
import RegisterPage from '../src/components/views/RegisterPage/RegisterPage';
import VideoUploadPage from '../src/components/views/VideoUploadPage/VideoUploadPage';

import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route> */}
          
          <Route exact path="/" component = {Auth(LandingPage, null)}/>
          <Route exact path="/login" component = {Auth(LoginPage, false)}/>
          <Route exact path="/register" component = {Auth(RegisterPage, false)}/>
          <Route exact path="/video/upload" component = {Auth(VideoUploadPage, true)}/>
          
        </Switch>
      </div>
    </Router>
  );
}


export default App;
