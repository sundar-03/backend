import React from 'react';
import '../landingPage/landingPage.css'
import './home.css'

import cseaLogo from '../images/csea-logo.png'


class Home extends React.Component {
    render() {

    return(
        <>
        <div className="home" id="home">

            <div class="container">
                <div style={{color:"white"}}>
                    <img src={cseaLogo} alt="CSEA" className="csea-logo"/>
                    <br/> <br/>
                    presents
                </div>
                <div class="glitch" data-text="vortex'21">vortex'21</div>
                <div class="glow">vortex'21</div>
                <p class="subtitle">Stay Tuned</p>
                <br/>
                <br/>
                <div class="msg">
                    Events and Workshops coming soon!
                </div>
                
                
            </div>

           
              
         
        </div>
        
        </>
    
    )
        
}
}

export default Home;
