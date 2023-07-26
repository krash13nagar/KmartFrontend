import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>Kmart.</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2023 &copy; Krash13Nagar</p>
    </div>

    <div className="rightFooter">
        <h4>Follow US</h4>
        <div className='tags'>
          <a href='/' target='_blank' rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
          <a  href='/' target='_blank' rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
          <a  href='/' target='_blank' rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
          <a  href='/' target='_blank' rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
        </div>
      </div>
  </footer>
  );
}

export default Footer