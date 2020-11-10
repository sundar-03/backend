import React from "react";
import "./register.css";

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            username: "",
            email: "",
            college: "",
            dept: "",
            mobile: "",
            password: "",
            confirmPassword: "",
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
        var newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            college: this.state.college,
            dept: this.state.dept,
            mobile: this.state.mobile,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };

        this.props.registerUser(newUser);
    };

    render() {
        return (
            <div className="login container-fluid lmain ">
                <br />
                <div className="row lmain-head justify-content-center">
                    <h1 className="col-md-3">Register</h1>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="row lmain-rno justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="name">
                                <b>Name</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.inputChange}
                                value={this.state.name}
                                required
                            />
                        </div>
                    </div>

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
                                value={this.state.username}
                                required
                            />
                        </div>
                    </div>

                    <div className="row lmain-rno justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="email">
                                <b>Email Id</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.inputChange}
                                value={this.state.email}
                                required
                            />
                        </div>
                    </div>

                    <div className="row lmain-pass justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="college">
                                <b>College Name</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="college"
                                id="college"
                                onChange={this.inputChange}
                                value={this.state.college}
                                required
                            />
                        </div>
                    </div>

                    <div className="row lmain-pass justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="dept">
                                <b>Department</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="dept"
                                id="dept"
                                onChange={this.inputChange}
                                value={this.state.dept}
                                required
                            />
                        </div>
                    </div>
                    <div className="row lmain-rno justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="rno">
                                <b>Mobile</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                name="mobile"
                                id="mobile"
                                onChange={this.inputChange}
                                value={this.state.mobile}
                            />
                        </div>
                    </div>

                    <div className="row lmain-pass justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="pwd">
                                <b>Password</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="password"
                                name="password"
                                id="passwordd"
                                onChange={this.inputChange}
                                value={this.state.password}
                                required
                            />
                        </div>
                    </div>
                    <div className="row lmain-pass justify-content-center">
                        <div className="col-md-3">
                            <label htmlFor="confirm-pwd">
                                <b>Confirm Password</b>
                            </label>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={this.inputChange}
                                value={this.state.confirmPassword}
                                required
                            />
                        </div>
                    </div>

                    <div className="row lmain-btn justify-content-center">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
