import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";

import { useData, allData, getUID, useUserState } from './FirebaseHandle'

const Home = () => {
  const [user] = useUserState();

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [formObject, loading, error] = useData('/', allData);
  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>Loading the form...</h2>

  let allForms = new Map();
  for (let i in formObject) {
    // console.log(i);
    // console.log(formObject[i].results);
    // for (let j in formObject[i].results) {
    //   console.log(formObject[i].results[j]);
    // }
    // console.log(formObject[i].date);
    if (formObject[i].author == getUID(user)) {
      allForms.set(i, formObject[i]);
    }
  }
  // console.log(allForms);

  let allResponses = new Map();
  for (let i in formObject) {
    let formResult = formObject[i].results
    for (let j in formResult) {
      if (formResult[j].author == getUID(user)) {
        allResponses.set(i, formObject[i]);
      }
    }
  }
  console.log(allResponses);


  const getUrl = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    window.location.assign(window.location.href + 'form/?id=' + elements.formCode.value);
  }

  return (
    <div className="home">
      <div class="MainScreen">
        <h3>Dashboard</h3>
        {/* disabled main buttons --replaced with nav bar */}
        {/* <NavLink data-testid="createFormButtonLink" to="/create">
          <button data-cy="createFormCy" data-testid="createFormButton" type="button" className="btn btn-primary me-4">
            Create Form
          </button>
        </NavLink>
        <button type="button" className="btn btn-success" onClick={handleShow1}>Fill Response</button> */}
        <div class="card border-primary mt-4">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn" type="button" data-toggle="collapse" data-target="#formList" aria-expanded="true">
                Your Forms
              </button>
            </h5>
          </div>
        </div>
        <div class="collapse show" id="formList">
          <ul className='list-group'>
            {Array.from(allForms).map(form =>
              <li className="list-group-item list-group-item-light" key={form[0]}>{form[1].eventName}</li>)}
            {/* ; key is {form[0]} */}
          </ul>
        </div>

        <div class="card border-info mt-2">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn" type="button" data-toggle="collapse" data-target="#responseList" aria-expanded="true">
                Your Responses
              </button>
            </h5>
          </div>
        </div>
        <div class="collapse show" id="responseList">
          <ul className='list-group'>
            {Array.from(allResponses).map(form =>
              <li className="list-group-item list-group-item-light" key={form[0]}>{form[1].eventName}</li>)}
            {/* ; key is {form[0]} */}
          </ul>
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
    </div >
  );
}

export default Home;