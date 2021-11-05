import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";

function Home() {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const getUrl = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    window.location.assign(window.location.href + 'form/?id=' + elements.formCode.value);
  }

  return (
    <div className="home">
      <div class="MainScreen">
        <NavLink data-testid="createFormButtonLink" to="/create">
          <button data-cy="createFormCy" data-testid="createFormButton" type="button" className="btn btn-primary me-4">
            Create Form
          </button>
        </NavLink>
        <button type="button" className="btn btn-success" onClick={handleShow1}>
            Fill Response
          </button>
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
    </div >
  );
}

export default Home;