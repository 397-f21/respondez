import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import 'font-awesome/css/font-awesome.min.css';

import { useData, allData, getUID, useUserState } from './FirebaseHandle'

// reference: https://stackoverflow.com/a/14966131
const getCSV = (form) => {
  let header = []
  let body = []
  let count = 1;
  console.log(form);

  // for (let i in form[1]) {
  //   let f = form[i]
  //   console.log(form[i].isCapacityLimit)
  //   let status = ""
  //   if (form[i].isCapacityLimit !== "N/A") { // there is capacity limit
  //     if (count <= form[i].isCapacityLimit) { // user less than cap
  //       status = "Admitted";
  //     } else { // user greater than cap
  //       if (form[i].waitlist) { // waitlist enabled
  //         status = "Waitlisted"
  //       } else { // failed to get in
  //         status = "Closed"
  //       }
  //     }
  //   } else { status = "Admitted"; }
  //   console.log(status)
  let json = form[1].results
  for (let i in json) {
    let sub = json[i];
    sub["author"] = count;
    let status = ""
    if (header.length === 0) {
      header = Object.keys(json[i]);
      header.push("status")
    }
    if (form[1].isCapacityLimit !== -1) { // there is capacity limit
      if (count <= form[1].isCapacityLimit) { // user less than cap
        status = "Admitted";
      } else { // user greater than cap
        if (form[1].waitlist == true) { // waitlist enabled
          status = "Waitlisted";
        } else { // failed to get in
          status = "Closed";
        }
      }
    } else { status = "Admitted"; }
    console.log(status)
    console.log(count)
    sub["status"] = status;
    let row = [];
    for (let k in header) {
      row.push(sub[header[k]]);
    }
    body.push(row);
    count += 1;
  }
  header[0] = "id";
  const csv_final = [header].concat(body);
  console.log(csv_final)
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

  const [allFormData, loading, error] = useData('/', allData);
  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>Loading the form...</h2>

  let allForms = new Map();
  for (let i in allFormData) {
    if (allFormData[i].author == getUID(user)) {
      let form = allFormData[i]
      if (form.isCapacityLimit == -1) { form.isCapacityLimit = "N/A"; }

      const resultCnt = form.results ? Object.values(form.results).length : 0;
      console.log("form.waitlist:"+form.waitlist);
      if (!form.waitlist || form.waitlist === "N/A") { form.waitlist = "N/A"; }
      else {
        form.waitlist = resultCnt - form.isCapacityLimit;
      }

      form["rsvp"] = resultCnt;
      allForms.set(i, form);
    }
  }

  let allResponses = new Map();
  for (let i in allFormData) {
    let form = allFormData[i];
    let formResult = allFormData[i].results
    let formCount = 0;
    for (let j in formResult) {
      formCount += 1;
      if (formResult[j].author == getUID(user)) { // get user's response
        let status = "Admitted"
        if (allFormData[i].isCapacityLimit != -1) { // there is a capacity limit
          if (formCount > allFormData[i].isCapacityLimit) { // over the capacity limit
            if (allFormData[i].waitlist == true) { // waitlist available
              status = "Waitlisted (" + String(formCount - allFormData[i].isCapacityLimit) + "/" + String(allFormData[i].isCapacityLimit) + ")";
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
              <li className="list-group-item list-group-item-light" key={form[0]}>
                <i type="button" class="fas fa-file-download me-2" onClick={() => getCSV(form)}></i>
                {form[1].eventName} (RSVP: {form[1].rsvp}, Waitlist: {form[1].waitlist}, Capacity: {form[1].isCapacityLimit})
                {/*<a onClick={getUrl(?)}>Get Form URL</a>*/}
                <p>URL: {window.location.href + 'form/?id=' + form[0]}</p>
              </li>)}
            {/* ; key is {form[0]} */}
          </ul>
        </div>

        <div class="card border-info mt-2" type="button" data-toggle="collapse" data-target="#responseList" aria-expanded="true">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">Responses You've Sent</h5>
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