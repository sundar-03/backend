import React from "react";
import "./login.css";

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
        };
    }

    inputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var user = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.loginUser(user);
    };

    render() {
        return (
            <div className="login container-fluid lmain ">
                <br />
                <div className="row lmain-head justify-content-center">
                    <h1 className="col-md-3">Login</h1>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="row lmain-rno justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="username">
                                <b>Username</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={this.inputChange}
                                value={this.state.email}
                                required
                            />
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
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.inputChange}
                                value={this.state.password}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row lmain-btn justify-content-center">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;
