// Import basics
import { useDispatch } from 'react-redux';
// Import router stuff
import { Link } from 'react-router-dom';
// Import icons
import { RiLogoutCircleLine } from 'react-icons/ri';
// Import server actions
import { logout, changePage } from '../../actions/authActions';

const Logout = () => {
  // Dispatch the logout action if the button is clicked
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(changePage('login'));
    dispatch(logout());
  }

  const navLinkClasses =
    " relative flex group items-center justify-center border-blue-400 " +
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
    <Link to='/login' onClick={onLogout} className={navLinkClasses}>
      <p className={navTextClasses}>
        Logout
      </p>
      <p className={navIconClasses}>
        <RiLogoutCircleLine size="40px" />
      </p>
    </Link>
  );
};

export default Logout;
