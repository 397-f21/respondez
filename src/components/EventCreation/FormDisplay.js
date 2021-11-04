import {useData, formData} from '../FirebaseHandle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'

const FormDisplay = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  // const json = useData('-MnXWiXjH6O1CqMKfUAs');
  const [formObject, loading, error] = useData('/' + '-MnXWiXjH6O1CqMKfUAs', formData); // hardcoded key
  // console.log(params.id);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the form...</h1>

  return (
    <form >
      <h2>Preview Form</h2>
      <h3> { formObject.eventName }</h3>
      <p> <b>When?</b> {formObject.date}</p>
      <p>{formObject.description}</p>
      <p> {formObject.isCapacityLimit !== -1 ? `Event Capacity: ${formObject.isCapacityLimit}` : ``} </p>
      <div className="form-inline">
        <div className="form-group mb-2">
          <label htmlFor="rsvpName" className="me-4"> Name </label>
          <input className="form-control" id="rsvpName" type="name" />
        </div>
      </div>
      {formObject.needsEmail ?
        <div className="form-inline">
          <div className="form-group mb-2">
            <label htmlFor="rsvpEmail" className="me-4"> Email </label>
            <input className="form-control" id="rsvpEmail" type="email" />
          </div>
        </div>
        : ``}
      {formObject.needsPhone ?
        <div className="form-inline">
          <div className="form-group mb-2">
            <label htmlFor="rsvpPhoneNum" className="me-4"> Phone Number </label>
            <input className="form-control" id="rsvpPhoneNum" type="tel" />
          </div>
        </div>
        : ``}

      <div className="btn-toolbar">
        <NavLink to="/"> <button type="button" className="btn btn-secondary mt-4 me-4">Cancel</button></NavLink>
        <button type="submit" className="btn btn-primary mt-4">Submit</button>
      </div>

    </form>
  );
}

export default FormDisplay;
