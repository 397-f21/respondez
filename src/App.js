import logo from './logo.svg';
import './App.css';
import { Form } from 'react-bootstrap/Button';
import { useState } from 'react';

function App() {
  let [capacityLimit, setCapacityLimit] = useState(false)

  return (
    <>
      <div>
        <h1> RespondEZ</h1>
      </div>

      <form>
        <div class="form-group">
          <label for="exampleInputEmail1"> Event Name</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <br />
        <div class="form-group">
          <label for="eventDescription"> Event Description </label><br />
          <textarea class="form-control" id="eventDescription" rows="3"></textarea>
        </div>
        <br />
        <div class="form-check">
          <label for="exampleInputPassword1"> Set Capacity Limit? </label>
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="capacityYes" />
          <label class="form-check-label" for="exampleRadios1">
            Yes
          </label>
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="capacityNo" checked />
          <label class="form-check-label" for="exampleRadios2">
            No
          </label>
        </div>

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
