import React from "react";
import "./register.css";

function Register() {

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login container-fluid lmain ">

      <br/>
      <div className="row lmain-head justify-content-center">
        <h1 className="col-md-3">Login</h1>
      </div>
      <br />
      <form>
        <div className="row lmain-rno justify-content-center">
          <div className="col-md-3">
            <label htmlFor="name">
              <b>Name</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="text" name="name" id="name" required />
          </div>
        </div>

        <div className="row lmain-pass justify-content-center">
          <div className="col-md-3">
            <label htmlFor="college">
              <b>College Name</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="text" name="college" id="college" required />
          </div>
        </div>
        
        <div className="row lmain-rno justify-content-center">
          <div className="col-md-3">
            <label htmlFor="rno">
              <b>Email Id</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="email" name="rno" id="rno" required />
          </div>
        </div>

        <div className="row lmain-pass justify-content-center">
          <div className="col-md-3">
            <label htmlFor="dept">
              <b>Department</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="text" name="dept" id="dept" required />
          </div>
        </div>
        <div className="row lmain-rno justify-content-center">
          <div className="col-md-3">
            <label htmlFor="rno">
              <b>Mobile</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="number" name="mobile" id="mobile" />
          </div>
        </div>

        <div className="row lmain-pass justify-content-center">
          <div className="col-md-3">
            <label htmlFor="pwd">
              <b>Password</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="password" name="pwd" id="pwd" required />
          </div>
        </div>
        <div className="row lmain-pass justify-content-center">
          <div className="col-md-3">
            <label htmlFor="confirm-pwd">
              <b>Confirm Password</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="password" name="confirm-pwd" id="confirm-pwd" required />
          </div>
        </div>
                
        
        
        <div className="row lmain-btn justify-content-center">
          <div className="col-md-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default Register;