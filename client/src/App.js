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

import TestPage from '../src/components/views/TestPage/TestPage';

import MyTest from '../src/components/views/WritingUploadPage/MyMap/MyTest';

import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <NavBar />
      {/* <TestPage/> */}
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
          <Route exact path="/test" component = {Auth(TestPage, null)}/>
          <Route exact path="/writing/upload" component = {Auth(WritingUploadPage, true)}/>
          <Route exact path="/writing/:writingId" component = {Auth(WritingDetailPage, null)}/>
          <Route exact path="/join/joinedPage" component = {Auth(JoinedPage, null)}/>

          <Route exact path="/writing/upload/MyTest" component = {Auth(MyTest, null)}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
