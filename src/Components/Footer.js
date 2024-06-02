import { FaTwitter, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';

const AppFooter = () => {
  return (
    <footer className="appFooter">
      <div className="footerContent">
        <p>This is a project made for AF members who enjoy exploring the many AF gyms islandwide.</p>
        <div className="socialIcons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
