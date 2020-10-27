import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage/landingPage";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Register from "./register/register";
import Login from "./login/login";
import Home from "./home/home";
import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            registered: false,
            loggedIn: false
          }
    }

    loginUser = (user) => {
        axios.post("http://localhost:5000/login", user).then((res) => {
            if(res.data.success){
                this.setState({ loggedIn: true });
            }
            else{
                alert(res.data.message);
            }
        });
    };

    registerUser = (user) => {
        axios.post("http://localhost:5000/register", user).then((res) => {
          if(res.data.success){
            this.setState({ registered: true });
          }
          else{
            alert(res.data.message);
          }
        });
    };

    render() {
        if(this.state.registered){
            window.location = "/login";
            this.setState({ registered: false });
        }
        if(this.state.loggedIn){
            window.location = "/home";
        }

        return (
            <>
                <Router>
                   
                    <Switch>
                        <Route path="/" exact>
                            <Navbar />
                            <LandingPage />
                        </Route>
                        <Route path="/register" exact>
                            <Navbar />
                            <Register registerUser={this.registerUser} />
                        </Route>
                        <Route path="/login" exact>
                            <Navbar />
                            <Login loginUser={this.loginUser} />
                        </Route>
                        <Route path="/home" exact>
                            <Home />
                        </Route>
                    </Switch>

                    <Footer />
                </Router>
            </>
        );
    }
}
export default App;
