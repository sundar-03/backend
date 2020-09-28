import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage/landingPage";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Register from "./register/register";
import Login from "./login/login";
import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
    }

    loginUser = (user) => {
        axios.post("http://localhost:5000/login", user).then((res) => {
            console.log(res);
        });
    };

    registerUser = (user) => {
        axios.post("http://localhost:5000/register", user).then((res) => {
            console.log(res);
        });
    };

    render() {
        return (
            <>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact>
                            <LandingPage />
                        </Route>
                        <Route path="/register" exact>
                            <Register registerUser={this.registerUser} />
                        </Route>
                        <Route path="/login" exact>
                            <Login loginUser={this.loginUser} />
                        </Route>
                    </Switch>

                    <Footer />
                </Router>
            </>
        );
    }
}
export default App;
