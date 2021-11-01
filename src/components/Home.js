import React, { Button } from 'react';
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="home">
      <div class="MainScreen">
        <NavLink data-testid="createFormButtonLink" to="/create">
          <button data-testid="createFormButton" type="button" className="btn btn-primary">
            Create Form
          </button>
        </NavLink>
      </div>
    </div >

  );
}

export default Home;