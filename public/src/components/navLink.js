// Import router stuff
import { Link } from 'react-router-dom';

// Set up a nav link that routes to the target with the provided text and icon
const NavLink = ({ target, text, icon, extraClasses, onClick }) => {
  const navLinkClasses =
    " relative flex group items-center justify-center " +
    " border-2 rounded-xl bg-gradient-to-br from-black via-gray-800 to-black " +
    " md:h-16 md:w-20 h-14 w-16 mx-2 2xl:mx-0 my-2 cursor-pointer ";
  const navTextClasses =
    " absolute opacity-0 group-hover:opacity-100 whitespace-nowrap  " +
    " text-gray-300 text-lg no-underline hover:no-underline " +
    " transition duration-300 ease-in-out font-semibold";
  const navIconClasses =
    " absolute opacity-1 group-hover:opacity-0 text-gray-300 " +
    " transition duration-300 ease-in-out ";

  return (
    <Link className={navLinkClasses+extraClasses} to={target} onClick={onClick}>
      <p className={navTextClasses}>{text}</p>
      <p className={navIconClasses}>{icon}</p>
    </Link>
  );
};

export default NavLink;
