import logo from './logo.svg';
import './App.css';
import {Form} from 'react-bootstrap/Button';

function App() {
  return (
    <>
      <div>
        <h1> RespondEZ</h1>
      </div>

      <form>
        <div class="form-group">
          <label for="exampleInputEmail1"> Event Name</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1"> Capacity </label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label class ="form-check-label" for="exampleCheck1"> Ask for Phone Number</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label class ="form-check-label" for="exampleCheck1"> Ask for Phone Number</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

    </>

  );
}


//<small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>

export default App;
