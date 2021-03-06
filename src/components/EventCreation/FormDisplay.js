import { useData, formData } from '../FirebaseHandle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'
import { addSubmission, useUserState, signInWithGoogle } from '../FirebaseHandle'

const FormDisplay = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const [formObject, loading, error] = useData('/' + params.id, formData);

  const [user] = useUserState();

  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>Loading the form...</h2>

  const submitForm = (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    var submission = {
      "rsvpName": elements.rsvpName.value,
      "rsvpEmail": formObject.needsEmail ? elements.rsvpEmail.value : formObject.needsEmail,
      "rsvpPhone": formObject.needsPhone ? elements.rsvpPhoneNum.value : formObject.needsPhone
    }

    // remove false fields
    // reference: https://stackoverflow.com/a/24770914
    if (!formObject.needsEmail) {
      delete submission["rsvpEmail"];
    }
    if (!formObject.needsPhone) {
      delete submission["rsvpPhone"];
    }

    addSubmission(submission, params.id);
    window.location.assign(window.location.href.split("/form")[0]);
  }



  const actualForm = (
    <form onSubmit={(event) => { submitForm(event); }}>
      <h3> {formObject.eventName}</h3>
      <p> <b>When?</b> {formObject.date}</p>
      <p>{formObject.description}</p>
      <p> {formObject.isCapacityLimit !== -1 ? `Event Capacity: ${formObject.isCapacityLimit}` : ``} </p>
      <div className="form-inline">
        <div className="form-group mb-2">
          <label htmlFor="rsvpName" className="me-4">Name</label>
          <input className="form-control" id="rsvpName" type="name" />
        </div>
      </div>
      {formObject.needsEmail ?
        <div className="form-inline">
          <div className="form-group mb-2">
            <label htmlFor="rsvpEmail" className="me-4">Email</label>
            <input className="form-control" id="rsvpEmail" type="email" />
          </div>
        </div>
        : ``}
      {formObject.needsPhone ?
        <div className="form-inline">
          <div className="form-group mb-2">
            <label htmlFor="rsvpPhoneNum" className="me-3">Phone</label>
            <input className="form-control" id="rsvpPhoneNum" type="tel" />
          </div>
        </div>
        : ``}

      <div className="btn-toolbar">
        <NavLink to="/"> <button id="rsvpCancel" type="button" className="btn btn-secondary mt-4 me-4">Cancel</button></NavLink>
        <button type="submit" id="rsvpSubmit" className="btn btn-primary mt-4"  >Submit</button>
      </div>
    </form>);

  return (<>{user ? actualForm : signInWithGoogle()}</>);
}

export default FormDisplay;
