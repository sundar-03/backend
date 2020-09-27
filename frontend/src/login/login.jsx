import React from "react";
import "./login.css";

function Login() {

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login container-fluid lmain ">

      <br />
      <div className="row lmain-head justify-content-center">
        <h1 className="col-md-3">Login</h1>
      </div>
      <br />
      <form>
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
        <br />
        <div className="row lmain-pass justify-content-center">
          <div className="col-md-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
          </div>
          <div className="col-md-3">
            <input type="password" name="password" id="password" required />
          </div>
        </div>
        <br />
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

export default Login;