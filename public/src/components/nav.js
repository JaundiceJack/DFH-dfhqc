// Import basics
import { useSelector, useDispatch } from 'react-redux';
// Import nav icons
import { FaBalanceScale } from 'react-icons/fa';
import { GiPowder, GiPowderBag, GiBarrel, GiMedicinePills } from 'react-icons/gi';
import { RiLoginCircleLine } from 'react-icons/ri';
import { ImLab } from 'react-icons/im';
import { IoDocuments } from 'react-icons/io5';
// Import components
import NavLink        from './navLink';
import Logo           from './logo';
import Logout         from './account/logout'
// Import actions
import { changePage } from '../actions/authActions';

const Nav = () => {
  // Check for user authentication
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // Get the active page to highlight
  const page = useSelector(state => state.auth.currentPage);

  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  return (
    <nav className="flex flex-row 2xl:flex-col">
      <Logo onClick={() => changeActive('home')}/>
      <div className="grid grid-cols-3 sm:grid-cols-5 2xl:grid-cols-1 ml-1 h-full content-start">
        <NavLink target="/raws" text="Raws"
                 icon=<GiPowder size="40px" />
                 extraClasses={page === 'raws' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('raws') } />
        <NavLink target="/blends" text="Blends"
                 icon=<GiPowderBag size="40px" />
                 extraClasses={page === 'blends' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('blends') } />
        <NavLink target="/bulks" text="Bulks"
                 icon=<GiBarrel size="40px" />
                 extraClasses={page === 'bulks' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('bulks') } />
        <NavLink target="/fgs" text="FGs"
                 icon=<GiMedicinePills size="40px" />
                 extraClasses={page === 'fgs' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('fgs') } />
        <NavLink target="/samples" text="Samples"
                 icon=<IoDocuments size="40px" />
                 extraClasses={page === 'samples' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('samples') } />
        <NavLink target="/labs" text="Labs"
                 icon=<ImLab size="40px" />
                 extraClasses={page === 'labs' ? "border-green-600" : "border-blue-400"}
                 onClick={ () => changeActive('labs') } />
        
        {/*If not logged in, show the login button*/}
        {!isAuthenticated &&
          <NavLink target="/login" text="Login"
            icon=<RiLoginCircleLine size="40px" />
            extraClasses={page === 'login' ? "border-green-600" : "border-blue-400"}
            onClick={() => changeActive('login')}/>}

        {/* If logged in, show the app and logout button*/}
        {isAuthenticated &&
          <Logout />}
      </div>
    </nav>
  );
};

export default Nav;
