import React from 'react';
import './footer.css';


function Footer() {
  return (
    <div className='footer-container'>
      <section className="social-media">
        <div className='social-media-wrap'>
          <small className="credits">Developed by Vortex CSG </small>
          <div className='social-icons'>
            <a
              className='social-media-link'
              href='https://www.facebook.com/vortex.nitt/'
              target='_blank'
              aria-label='Facebook'
              rel='noopener noreferrer'
            >
              <i className='fa fa-facebook-f' />
            </a>
            <a
              className='social-media-link'
              href='https://www.instagram.com/vortex_nitt/'
              target='_blank'
              aria-label='Instagram'
              rel='noopener noreferrer'
            >
              <i className='fa fa-instagram' />
            </a>
            <a
              className='social-media-link'
              href='https://www.linkedin.com/company/vortex-nit-trichy/'
              target='_blank'
              aria-label='LinkedIn'
              rel='noopener noreferrer'
            >
              <i className='fa fa-linkedin' />
            </a>
          </div>
          </div>
          </section>
    </div>
  );
}

export default Footer;