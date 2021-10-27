// TODO: find the bug and fix it. maybe even set up a test.......
let changeCapacityLimit = (e, setCapacityLimit) => setCapacityLimit(e.target.checked);

const CapacityForm = (display) => (
  display ?
    <form>
      <div className="form-group">
        <label htmlFor="capacityLimit"> Capacity Limit </label>
        <input className="form-control" id="capacityLimit" type="number" />
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="isThereWaitlist" />
        <label className="form-check-label" htmlFor="isThereWaitlist">Waitlist?</label>
      </div>
    </form>
    : <></>
)

export const DisplayEventCreator = ({ capacityLimit, setCapacityLimit }) => (
  <>
    <form>
      <div className="form-group">
        <label htmlFor="eventName"> Event Name</label>
        <input type="name" className="form-control" id="eventName" placeholder="Enter event name" />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="eventDescription"> Event Description </label><br />
        <textarea className="form-control" id="eventDescription" rows="3"></textarea>
      </div>
      <br />
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="isThereCapacity" onChange={(e) => changeCapacityLimit(e, setCapacityLimit)} />
        <label className="form-check-label" htmlFor="isThereCapacity">Set Capacity Limit?</label>
      </div>
      <CapacityForm display={capacityLimit} />

      <br />
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </>
)