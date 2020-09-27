import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import vortexLogo from '../../images/vortex-logo.png'

function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = ()=> setClick(!click);
    const closeMobileMenu = ()=> setClick(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo">
                    <img src={vortexLogo} alt="Vortex" className="vortex-logo"/> 
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fa fa-times': 'fa fa-bars'}/>

                    </div>
                    <ul className={click? 'nav-menu active':'nav-menu'}>
                        <li className='nav-item'>
                            <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/register" className='nav-links' onClick={closeMobileMenu}>
                                Register
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/login" className='nav-links' onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>
                        
                    
                    </ul>

                </div>
                

            </nav>

            
        </>
    )
}

export default Navbar; 
