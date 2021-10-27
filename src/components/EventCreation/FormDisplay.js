
export const FormDisplay = ({ formContent }) => (
    <form>
        <h1> {formContent.eventName.value}</h1>
        <h2> When? {formContent.eventDateInput.value}</h2>
        <p> Description: {formContent.eventDescription.value}</p>
        <h2> {formContent.isThereCapacity.checked ? `Event Capacity: ${formContent.capacityLimit.value}` : ``} </h2>
        <div className="form-inline">
            <div className="form-group mb-2">
                <label htmlFor="rsvpName"> Name </label>
                <input className="form-control" id="rsvpName" type="name" />
            </div>
        </div> 
        {formContent.askEmail.checked ? 
            <div className="form-inline">
                <div className="form-group mb-2">
                    <label htmlFor="rsvpEmail"> Email </label>
                    <input className="form-control" id="rsvpEmail" type="email" />
                </div>
            </div> 
            : ``}
        {formContent.askPhoneNum.checked ? 
            <div className="form-inline">
                <div className="form-group mb-2">
                    <label htmlFor="rsvpPhoneNum"> Phone Number </label>
                    <input className="form-control" id="rsvpPhoneNum" type="tel" />
                </div>
            </div> 
            : ``}
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
)