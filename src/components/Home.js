import React, { Button } from 'react';
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="home">
      <div class="container">
        <a className="nav-link" href="/create">
          <button className="btn btn-primary">Create Form</button>
        </a>
        {/* <NavLink to="/about"> Dashboard </NavLink> */}
      </div>
    </div >

  );
}

export default Home;