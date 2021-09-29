//
import { useDispatch } from 'react-redux';
// Import the logo
import logo from '../images/logo_full.png';
// Import router links
import { Link } from 'react-router-dom'
// Import actions
import { changePage } from '../actions/authActions';

const Home = () => {
  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  const linkTextCs = "ml-1 text-blue-100 text-lg font-semibold transform duration-75 ease-in-out hover:scale-105";

  return (
    <div className="sm:m-4 w-full flex flex-col rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-row items-baseline">
        <img className="rounded-lg mt-4 ml-4 p-2 bg-white" src={logo} alt="Designs for Health Logo" />
        <h1 className="font-semibold text-blue-100 ml-2 mt-2 self-center">Designs for Health<br />Quality Collection</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="sm:mx-5 mx-2 mt-10 p-4 rounded border-l border-gray-800 bg-gray-700">
          <h2 className="font-bold text-blue-200 text-xl">Materials</h2>
          <div className="bg-blue-200 h-1 w-full rounded-full mt-1 mb-3" />
          <div>
            <Link to="/raws"  onClick={() => changeActive('raws')} >
              <p className={linkTextCs}>Raws</p>
            </Link>
            <Link to="/blends" onClick={() => changeActive('blends')} >
              <p className={linkTextCs}>Blends</p>
            </Link>
            <Link to="/bulks" onClick={() => changeActive('bulks')} >
              <p className={linkTextCs}>Bulks</p>
            </Link>
            <Link to="/fgs" onClick={() => changeActive('fgs')} >
              <p className={linkTextCs}>Finished Goods</p>
            </Link>
          </div>
        </div>
        <div className="sm:mx-5 mx-2 mt-10 p-4 rounded border-l border-gray-800 bg-gray-700">
          <h2 className="font-bold text-blue-200 text-xl">Lots</h2>
          <div className="bg-blue-200 h-1 w-full rounded-full mt-1 mb-3" />
          <div>
            <Link to="/samples" onClick={() => changeActive('samples')}>
              <p className={linkTextCs}>Sample Log</p>
            </Link>
            <Link to="/coas" onClick={() => changeActive('coas')}>
              <p className={linkTextCs}>CoA Generation</p>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home;
