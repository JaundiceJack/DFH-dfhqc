//
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import the logo
import logo from '../images/logo_full.png';
// Import router links
import { Link } from 'react-router-dom'
// Import actions
import { loadUser, changePage, login, logout } from '../actions/authActions.js';
import { clearMessages } from '../actions/msgActions.js'
import Button from './button.js';
import TextInput from './textInput.js';
import Message from './message.js';

const Home = () => {
  // Set internal variables for username+password
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [badEntries, setBadEntries] = useState([]);

  // Get the authentication state and submission errors
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated );
  const errorMsg        = useSelector( state => state.msg.error );

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const setUpdate = () => { updateTimer.current = setTimeout(() => {
    dispatch(clearMessages());
    setBadEntries([]);
    updateTimer.current = null; }, 5000);
  }
  // Update errors from the server
  useEffect(() => { dispatch(loadUser()); !updateTimer.current && setUpdate() }, [errorMsg]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On login submission, attempt to log in
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (email === "" || email === null) errs.push("Please enter a valid email address.");
    if (password === "" || password === null) errs.push("Please enter a password.");
    if (password.length > 0 && password.length < 8) errs.push("Passwords must be at least 8 characters in length.");
    setBadEntries(errs);
    // Attempt logging in
    if (errs.length === 0) {
      const currentUser = { email: email, password: password };
      dispatch(login(currentUser));
    }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && setUpdate(); };
  };
  const onLogout = () => { dispatch(logout()); };
  const changeActive = nextPage => { dispatch(changePage(nextPage)) };

  const linkTextCs = "ml-1 text-blue-100 text-lg font-semibold transform duration-75 ease-in-out hover:scale-105";

  return (
    <div className={"w-full h-full flex flex-col rounded "+
                    "bg-gradient-to-br from-gray-800 "+
                    "via-transparent to-gray-800"}>
      <div className="flex flex-row items-baseline">
        <img className="rounded-lg mt-4 ml-4 p-2 bg-white"
             src={logo} alt="Designs for Health Logo" />
        <h1 className="font-semibold text-blue-100 ml-2 mt-2 self-center">
          Designs for Health<br />Quality Collection</h1>
        <div className="flex-grow" />
        <form onSubmit={onSubmit}
              className={"mt-2 mr-2 h-full bg-gradient-to-bl "+
                         "from-gray-700 to-transparent rounded-lg "+
                         "grid self-start p-4"}>
          {isAuthenticated &&
            <Button color="bg-red-300"
                    text="Logout"
                    onClick={onLogout} extraClasses="px-6 h-8 self-center" /> }
          {!isAuthenticated && (
            <div className="flex flex-row w-full">
              <div className="grid gap-y-2 mr-1">
                <TextInput name="email"
                           value={email}
                           onEntry={e => setEmail(e.target.value)}/>
                <TextInput name="password"
                           type="password"
                           value={password}
                           onEntry={e => setPassword(e.target.value)} />
              </div>
              {badEntries.length === 0 && errorMsg === "" && <Button color="bg-green-300"
                      text="Login"
                      type="submit"
                      extraClasses="justify-self-end w-20 h-8" />}
              { badEntries.map(err => <Message error={err} /> )  }
              { errorMsg && <Message error={errorMsg} /> }
            </div>) }
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-6 mr-4">
        <div className="sm:mx-5 mx-2 mt-10 rounded-xl border-l border-gray-800 bg-gray-700">
          <h2 className="font-semibold text-blue-200 text-xl mx-4 my-2">Materials</h2>
          <div className="bg-blue-200 h-px w-full rounded-full mb-2" />
          <div className="mx-4 mb-4 flex flex-col justify-start items-start">
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
        <div className="sm:mx-5 mx-2 mt-10 rounded-xl border-l border-gray-800 bg-gray-700">
          <h2 className="font-semibold text-blue-200 text-xl mx-4 my-2">Lots</h2>
          <div className="bg-blue-200 h-px w-full rounded-full mb-2" />
          <div className="mx-4 mb-4 flex flex-col justify-start items-start">
            <Link to="/samples" onClick={() => changeActive('samples')}>
              <p className={linkTextCs}>Sample Log</p>
            </Link>
          </div>
        </div>
        <div />
        <div className="sm:mx-5 mx-2 mt-10 rounded-xl border-l border-gray-800 bg-gray-700">
          <h2 className="font-semibold text-blue-200 text-xl mx-4 my-2">Documents</h2>
          <div className="bg-blue-200 h-px w-full rounded-full mb-2" />
          <div className="mx-4 mb-4 flex flex-col justify-start items-start">
            <Link to="/sops" onClick={() => changeActive('sops')}>
              <p className={linkTextCs}>SOPs</p>
            </Link>
            <Link to="/wos" onClick={() => changeActive('wos')}>
              <p className={linkTextCs}>Work Orders</p>
            </Link>
          </div>
        </div>
        <div className="sm:mx-5 mx-2 mt-10 rounded-xl border-l border-gray-800 bg-gray-700">
          <h2 className="font-semibold text-blue-200 text-xl mx-4 my-2">Other</h2>
          <div className="bg-blue-200 h-px w-full rounded-full mb-2" />
          <div className="mx-4 mb-4 flex flex-col justify-start items-start">
            <Link to="/labs" onClick={() => changeActive('labs')}>
              <p className={linkTextCs}>Testing Labs</p>
            </Link>
            <Link to="/vendors" onClick={() => changeActive('vendors')}>
              <p className={linkTextCs}>Vendors</p>
            </Link>
            <Link to="/manufacturers" onClick={() => changeActive('manufacturers')}>
              <p className={linkTextCs}>Manufacturers</p>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home;
