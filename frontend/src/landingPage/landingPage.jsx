import React from 'react';
import './landingPage.css'
import cseaLogo from '../images/csea-logo.png'


class LandingPage extends React.Component {
    render() {

    return(
        <>
        <div className="home">

            <div class="container">
                <div style={{color:"white"}}>
                    <img src={cseaLogo} alt="CSEA" className="csea-logo"/>
                    <br/> <br/>
                    presents
                </div>
                <div class="glitch" data-text="vortex'21">vortex'21</div>
                    <div class="glow">vortex'21</div>
                    <p class="subtitle">Stay Tuned</p>
            </div>
              
         
        </div>
        
        </>
    
    )
        
}
}

export default LandingPage;
