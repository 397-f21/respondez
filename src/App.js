import logo from './logo.svg';
import './App.css';
import { Form } from 'react-bootstrap/Button';
import { useState } from 'react';


const CapacityForm = () => (
  <form>
    <div className="form-group">
      <label htmlFor="capacityLimit"> Capacity Limit </label><br />
      <textarea className="form-control" id="eventDescription" rows="3"></textarea>
    </div>
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
      <label className="form-check-label" htmlFor="waitlist">Waitlist?</label>
    </div>

  </form>
)

const App = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  // bug
  let changeCapacityLimit = (e) => {
    console.log(e.target.value)
    console.log(e.target.checked)   
    setCapacityLimit(!capacityLimit)
  }

  return (
    <>
      <div>
        <h1> RespondEZ</h1>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1"> Event Name</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="eventDescription"> Event Description </label><br />
          <textarea className="form-control" id="eventDescription" rows="3"></textarea>
        </div>
        <br />
        <div className="form-check">
          <label htmlFor="exampleInputPassword1"> Set Capacity Limit? </label>
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="capacityYes" onChange={changeCapacityLimit}/>
          <label className="form-check-label" htmlFor="exampleRadios1">
            Yes
          </label>
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="capacityNo" checked />
          <label className="form-check-label" htmlFor="exampleRadios2">
            No
          </label>
        </div>

        {
          capacityLimit ? <CapacityForm/> : <br/>
        }


        <br />
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"> Ask for Phone Number</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"> Ask for Phone Number</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

    </>

  );
}


//<small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>

export default App;
