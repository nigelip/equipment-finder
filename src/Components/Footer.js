import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { AiOutlineX } from "react-icons/ai";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const AppFooter = () => {
  return (
    <footer className="appFooter">

      <div className='footer-container'>
        <h2>AF Guide</h2>
        <div className='web-links'>
          <Link to="/" onClick={scrollToTop} className='web-link-btn'>Home</Link>
          <Link to="/searchequipment" onClick={scrollToTop} className='web-link-btn'>Equipment</Link>
          <Link to="/searchgym" onClick={scrollToTop} className='web-link-btn'>Gym</Link>
          <Link to="/" onClick={scrollToTop} className='web-link-btn'>Contribute</Link>      
        </div>
        <div className='social-links'>
          {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a> */}
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"><AiOutlineX /></a>
          
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
