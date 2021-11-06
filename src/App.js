import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import FormDisplay from './components/EventCreation/FormDisplay';
import { signInWithGoogle, signOut, useUserState } from './components/FirebaseHandle';

const App = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [user] = useUserState();

  const createLink = () => {
    let current = window.location.href
    if (current.slice(-1) == '/') {
      return window.location.href + 'create';
    } else {
      return window.location.href + '/create'
    }
  }

  const getUrl = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    window.location.assign(window.location.href + 'form/?id=' + elements.formCode.value);
  }

  const SignInButton = () => (
    <Nav.Link onClick={() => signInWithGoogle()}>Sign In
    </Nav.Link>
  );

  const SignOutButton = () => (
    <Nav.Link onClick={() => signOut()}>Sign Out
    </Nav.Link>
  );

  return (
    <>
      <div id="main">
        <Navbar collapseOnSelect expand="false" bg="dark" variant="dark">
          <Navbar.Brand>
            {/* <i id="navLogo" class="fa fa-heart"></i> */}
            <a href='/'>RespondEZ</a>
          </Navbar.Brand>
          <Navbar.Toggle id="hamburger" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {user ? <SignOutButton /> : <SignInButton />}
              <a class="nav-link" href={createLink()}>Create Form</a>
              <Nav.Link onClick={handleShow1}>Fill Response</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div id="content">
          <h1> RespondEZ</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/create" component={CreateForm} />
              <Route path="/form" component={FormDisplay} />
              <Route component={Error} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header>
          <Modal.Title>What is your form code?</Modal.Title>
        </Modal.Header>
        <form onSubmit={(event) => { getUrl(event); }}>
          <Modal.Body>
            <div className="form-group mb-2">
              <label htmlFor="formCode" className="me-4"> Form Code: </label>
              <input className="form-control" id="formCode" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose1}>
              Cancel
            </button>
            <button className="btn btn-primary" type='submit'>Go!</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default App;
