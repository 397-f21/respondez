import 'bootstrap/dist/css/bootstrap.min.css';
// TODO: find the bug and fix it. maybe even set up a test.......
let changeCapacityLimit = (e, setCapacityLimit) => setCapacityLimit(e.target.checked);

const CapacityForm = () => (
  <>
    <form className="form-inline">
      <div className="form-group mb-2">
        <label htmlFor="capacityLimit"> Capacity Limit </label>
        <input className="form-control" id="capacityLimit" type="number" />
      </div>
    </form>
    <form>
      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" id="isThereWaitlist" />
        <label className="form-check-label" htmlFor="isThereWaitlist">Waitlist?</label>
      </div>
    </form>
  </>
)

export const DisplayEventCreator = ({ capacityLimit, setCapacityLimit, setFormMaker }) => (
  <>
    <form>
      <form className="form-inline mb-4">
        <div className="form-group">
          <label htmlFor="eventName" className="me-3"> Event Name</label>
          <input type="name" className="form-control" id="eventName" placeholder="Enter event name" />
        </div>
      </form>

      <form className="form-inline">
        <div id="eventDate" className="form-group input-with-post-icon datepicker">
          <label htmlFor="eventDate" className="me-4">Event Date</label>
          <input type="date" id="eventDateInput" class="form-control" />
        </div>
      </form>
      <br />
      <div className="form-group">
        <label htmlFor="eventDescription"> Event Description </label><br />
        <textarea className="form-control" id="eventDescription" rows="3"></textarea>
      </div>
      <br />
      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" id="isThereCapacity"
          data-target="#capacityCollapse" data-toggle="collapse" />
        <label className="form-check-label" htmlFor="isThereCapacity">Set Capacity Limit?</label>
      </div>

      <div id="capacityCollapse" className="collapse">
        <CapacityForm />
      </div>

      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="askPhoneNum" />
        <label className="form-check-label" for="askPhoneNum">Ask for Phone Number</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="askName" />
        <label className="form-check-label" for="askName">Ask for name</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="askRSVP" />
        <label className="form-check-label" for="askRSVP">Ask for RSVP</label>
      </div>
      <br />
      <button type="submit" className="btn btn-primary" onClick={() => setFormMaker(false)}>Submit</button>
    </form>
  </>
)