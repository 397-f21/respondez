// TODO: find the bug and fix it. maybe even set up a test.......
let changeCapacityLimit = (e, setCapacityLimit) => setCapacityLimit(e.target.checked);

const CapacityForm = (display) => (
    display ? 
        <form>
            <div className="form-group">
                <label htmlFor="capacityLimit"> Capacity Limit </label><br />
                <textarea className="form-control" id="capacityLimit" rows="3"></textarea>
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
                <label htmlFor="eventNameInput"> Event Name</label>
                <input type="name" className="form-control" id="eventNameInput" aria-describedby="eventName" placeholder="Enter event name" />
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
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1"> Ask for Phone Number</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>
)