import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className="social-media">
        <div className='social-media-wrap'>
          <small className="credits">Developed by Vortex CSG </small>
          <div className='social-icons'>
            <Link
              className='social-media-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fa fa-facebook-f' />
            </Link>
            <Link
              className='social-media-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fa fa-instagram' />
            </Link>
            <Link
              className='social-media-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fa fa-linkedin' />
            </Link>
          </div>
          </div>
          </section>
    </div>
  );
}

export default Footer;