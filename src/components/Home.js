import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";

import { useData, allData } from './FirebaseHandle'

const Home = () => {
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
    allForms.set(i, formObject[i]);
  }
  console.log(allForms);
  //console.log(allForms[0].date); 




  const getUrl = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    window.location.assign(window.location.href + 'form/?id=' + elements.formCode.value);
  }


  console.log(Array.from(allForms));

  return (
    <div className="home">
      <div class="MainScreen">

        {/* disabled main buttons --replaced with nav bar */}
        {/* <NavLink data-testid="createFormButtonLink" to="/create">
          <button data-cy="createFormCy" data-testid="createFormButton" type="button" className="btn btn-primary me-4">
            Create Form
          </button>
        </NavLink>
        <button type="button" className="btn btn-success" onClick={handleShow1}>Fill Response</button> */}

        <ul className='list-group'>
          {Array.from(allForms).map(form => <li className="list-group-item list-group-item-primary" key={form[0]}>{form[1].eventName}; key is {form[0]}</li>)}
        </ul>
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