import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import 'font-awesome/css/font-awesome.min.css';

import { useData, allData, getUID, useUserState } from './FirebaseHandle'

// reference: https://stackoverflow.com/a/14966131
const getCSV = (json) => {
  let header = []
  let body = []
  let count = 0;
  for (let i in json) {
    let sub = json[i];
    sub["author"] = count;
    if (header.length == 0) { header = Object.keys(json[i]); }
    let row = [];
    for (let k in header) {
      row.push(sub[header[k]]);
    }
    body.push(row);
    count += 1;
  }
  header[0] = "id";
  const csv_final = [header].concat(body);
  let csvContent = "data:text/csv;charset=utf-8,"
    + csv_final.map(e => e.join(",")).join("\n");

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "response.csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
}

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
    if (formObject[i].author == getUID(user)) {
      let form = formObject[i]
      if (form.isCapacityLimit == -1) { form.isCapacityLimit = "N/A"; }
      if (form.waitlist == false) { form.waitlist = "N/A"; }
      let resultCnt = 0;
      for (let j in form.results) { resultCnt += 1; }
      form["rsvp"] = resultCnt;
      allForms.set(i, form);
    }
  }

  let allResponses = new Map();
  for (let i in formObject) {
    let form = formObject[i];
    let formResult = formObject[i].results
    let formCount = 0;
    for (let j in formResult) {
      formCount += 1;
      if (formResult[j].author == getUID(user)) { // get user's response
        let status = "Admitted"
        if (formObject[i].isCapacityLimit != -1) { // there is a capacity limit
          if (j > formObject[i].isCapacityLimit) { // over the capacity limit
            if (formObject[i].waitlist == true) { // waitlist available
              status = "Waitlisted (" + String(formCount - formObject[i].isCapacityLimit) + "/" + String(formObject[i].isCapacityLimit) + ")";
            } else { // no waitlist
              status = "Event Closed"
            }
          }
        }
        form["status"] = status;
        allResponses.set(i, form);
      }
    }
  }

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
        <div class="card border-primary mt-4" type="button" data-toggle="collapse" data-target="#formList" aria-expanded="true">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">Your Forms</h5>
          </div>
        </div>
        <div class="collapse show" id="formList">
          <ul className='list-group'>
            {Array.from(allForms).map(form =>
              <li type="button" className="list-group-item list-group-item-light" key={form[0]} onClick={() => getCSV(form[1].results)}>
                <i class="fas fa-file-download me-2"></i>
                {form[1].eventName} (RSVP: {form[1].rsvp}, Waitlist: {form[1].waitlist}, Capacity: {form[1].isCapacityLimit})</li>)}
            {/* ; key is {form[0]} */}
          </ul>
        </div>

        <div class="card border-info mt-2" type="button" data-toggle="collapse" data-target="#responseList" aria-expanded="true">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">Your Responses</h5>
          </div>
        </div>
        <div class="collapse show" id="responseList">
          <ul className='list-group'>
            {Array.from(allResponses).map(form =>
              <li className="list-group-item list-group-item-light" key={form[0]}>
                {form[1].eventName} (Status: {form[1].status})</li>)}
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