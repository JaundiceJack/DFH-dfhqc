// Import router stuff
import { Link } from 'react-router-dom';
// Import the logo image
import logo from '../images/logo_small.png'

const Logo = ({ onClick }) => {
  const logoClasses = "h-14 w-14 sm:h-16 sm:w-16 p-1 ml-2 sm:ml-3 mt-2 sm:mt-4 mb-3 rounded-lg border-2 border-gray-400 bg-gray-600 transform duration-75 hover:scale-110 "

  return (
    <Link to="/" className={logoClasses} onClick={onClick}>
      <img src={logo} className="rounded-lg" alt="DFH Logo" />
    </Link>
  );
};

export default Logo;
