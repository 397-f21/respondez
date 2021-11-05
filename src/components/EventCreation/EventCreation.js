import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'
import { addNew } from '../FirebaseHandle'

// TODO: find the bug and fix it. maybe even set up a test.......
let changeCapacityLimit = (e, setCapacityLimit) => setCapacityLimit(e.target.checked);

const CapacityForm = () => (
  <>
    <div className="form-inline">
      <div className="form-group mb-2">
        <label htmlFor="capacityLimit"> Capacity Limit </label>
        <input className="form-control" id="capacityLimit" type="number" />
      </div>
    </div>

    <div className="form-check form-switch mb-4">
      <input className="form-check-input" type="checkbox" id="isThereWaitlist" />
      <label className="form-check-label" htmlFor="isThereWaitlist">Waitlist?</label>
    </div>
  </>
)

const validateTime = (date) => {
  var inputDate = new Date(date);
  var todaydate = new Date();
  console.log(inputDate, todaydate);
  return inputDate.getTime() >= todaydate.getTime();
}

export const createForm = (event/*, setFormMaker, setFormContent*/) => {
  event.preventDefault();
  const elements = event.target.elements;

  if (!validateTime(elements.eventDateInput.value)) {
    alert("Invalid Event Date: Event must take place today or later.");
  }
  else if (elements.eventName.length > 50) {
    alert("Invalid event name: Must be under 50 characters.");
  }
  else {
    const hashedKey = addNew(elements);
    // console.log(getForm(hashedKey)); // printing purpose
    alert("Your form url: " + hashedKey);
    //setFormContent(elements);
    //setFormMaker(false);
  }
}

export const DisplayEventCreator = ({ capacityLimit, setCapacityLimit, setFormMaker, setFormContent }) => (
  <>
    <h2>Create Form</h2>
    <form className="needs-validation" noValidate onSubmit={(event) => { createForm(event, setFormMaker, setFormContent); }}>
      <div className="form-inline mb-4">
        <div className="form-group">
          <label htmlFor="eventName" className="me-3"> Event Name</label>
          <input data-testid="nameTest" type="name" className="form-control" id="eventName" placeholder="Enter event name" required />
          <div className="invalid-feedback">
            Please choose a username.
          </div>
        </div>
      </div>

      <div className="form-inline">
        <div id="eventDate" className="form-group input-with-post-icon datepicker">
          <label htmlFor="eventDate" className="me-4">Event Date</label>
          <input type="date" id="eventDateInput" className="form-control" data-testid="dateTest" required />
        </div>
      </div>

      <br />
      <div className="form-group">
        <label htmlFor="eventDescription"> Event Description </label><br />
        <textarea className="form-control" id="eventDescription" data-testid="descriptionTest" rows="3" style={{ width: '66%' }} required></textarea>
      </div>
      <br />
      <div className="form-check form-switch mb-4">
        <input data-cy='capacityCy' data-testid="capacityTest" className="form-check-input" type="checkbox" id="isThereCapacity"
          data-target="#capacityCollapse" data-toggle="collapse" />
        <label className="form-check-label" htmlFor="isThereCapacity">Set Capacity Limit?</label>
      </div>

      <div data-cy='waitlistDivCy' id="capacityCollapse" className="collapse">
        <CapacityForm />
      </div>

      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="askEmail" />
        <label className="form-check-label" htmlFor="askEmail">Ask for email</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="askPhoneNum" />
        <label className="form-check-label" htmlFor="askPhoneNum">Ask for phone number</label>
      </div>
      <br />
      <div className="btn-toolbar">
        <NavLink to="/"> <button type="button" className="btn btn-secondary me-4">Cancel</button></NavLink>
        <button type="submit" className="btn btn-primary" data-testid="submitTest">Make Form!</button>
      </div>
    </form>
  </>
)
