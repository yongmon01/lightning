import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from '../src/components/views/LandingPage/LandingPage';
import LoginPage from '../src/components/views/LoginPage/LoginPage';
import NavBar from '../src/components/views/NavBar/NavBar';
import RegisterPage from '../src/components/views/RegisterPage/RegisterPage';
import WritingUploadPage from '../src/components/views/WritingUploadPage/WritingUploadPage';
import WritingDetailPage from '../src/components/views/WritingDetailPage/WritingDetailPage';
import JoinedPage from '../src/components/views/JoinedPage/JoinedPage'

import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>          
          <Route exact path="/" component = {Auth(LandingPage, null)}/>
          <Route exact path="/login" component = {Auth(LoginPage, false)}/>
          <Route exact path="/register" component = {Auth(RegisterPage, false)}/>
          <Route exact path="/writing/upload" component = {Auth(WritingUploadPage, true)}/>
          <Route exact path="/writing/:writingId" component = {Auth(WritingDetailPage, null)}/>
          <Route exact path="/join/joinedPage" component = {Auth(JoinedPage, null)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
