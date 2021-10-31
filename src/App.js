import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';

const App = () => {
  return (
    <>
      <div id="main">
        <h1> RespondEZ</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/create" component={CreateForm} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
