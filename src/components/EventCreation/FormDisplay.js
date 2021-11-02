export const FormDisplay = ({ formContent }) => (

  <form >
    <h2>Preview Form</h2>
    <h2> {formContent.eventName.value}</h2>
    <p> <b>When?</b> {formContent.eventDateInput.value}</p>
    <p>{formContent.eventDescription.value}</p>
    <p> {formContent.isThereCapacity.checked ? `Event Capacity: ${formContent.capacityLimit.value}` : ``} </p>
    <div className="form-inline">
      <div className="form-group mb-2">
        <label htmlFor="rsvpName" className="me-4"> Name </label>
        <input className="form-control" id="rsvpName" type="name" />
      </div>
    </div>
    {formContent.askEmail.checked ?
      <div className="form-inline">
        <div className="form-group mb-2">
          <label htmlFor="rsvpEmail" className="me-4"> Email </label>
          <input className="form-control" id="rsvpEmail" type="email" />
        </div>
      </div>
      : ``}
    {formContent.askPhoneNum.checked ?
      <div className="form-inline">
        <div className="form-group mb-2">
          <label htmlFor="rsvpPhoneNum" className="me-4"> Phone Number </label>
          <input className="form-control" id="rsvpPhoneNum" type="tel" />
        </div>
      </div>
      : ``}
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
)