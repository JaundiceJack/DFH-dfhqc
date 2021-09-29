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

  return (
    <Link to='/login' onClick={onLogout} className="">
      <p className="text-blue-100">
        Logout
      </p>
      <p className="">
        <RiLogoutCircleLine size="40px" />
      </p>
    </Link>
  );
};

export default Logout;
