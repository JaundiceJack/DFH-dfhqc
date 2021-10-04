// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import router stuff
import { Redirect, Link } from 'react-router-dom';
// Import server actions
import { register, changePage } from '../../actions/authActions';
import { clearMessages } from '../../actions/msgActions';

const Create = () => {
  // Set internal variables for username+password
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");
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
  useEffect(() => { !updateTimer.current && setUpdate() }, [errorMsg]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On form submission, attempt to log in
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (email === "" || email === null)
      errs.push("Please enter a valid email address.");
    if (password === "" || password === null)
      errs.push("Please enter a password.");
    if (password.length > 0 && password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    if (password !== confirm)
      errs.push("Password and password confirmation do not match.");
    setBadEntries(errs);
    // Attempt logging in
    if (errs.length === 0) {
      const newUser = {
        email:    email,
        password: password
      };
      dispatch(register(newUser));
    }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && setUpdate(); }
  }
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";
  const errorMsgCs = " px-3 py-2 mb-2 font-semibold text-white rounded-xl" +
                          " border-l border-gray-500 bg-gradient-to-tl" +
                          " from-red-900 to-gray-900 fadeError ";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 ";
  return (
    <section className="sm:m-4 w-full flex flex-col items-center justify-center rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <form className="flex flex-col items-center justify-center sm:w-3/4 md:w-1/2 2xl:w-1/4 bg-gray-700 p-4 rounded-lg mx-2 2xl:mx-0 mt-12 2xl:mt-0 mb-12 2xl:mb-0" onSubmit={onSubmit}>
        <div className="flex flex-row flex-nowrap w-full mb-2">
          <h2 className="text-lg text-yellow-300 font-semibold"> Create Account </h2>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-2" />
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-4 w-full mb-3 items-center gap-x-2">
            <label htmlFor="email"
                   className="text-right text-blue-100 text-lg">Email:</label>
            <input type="text"
                   name="email"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className={inputCs+" text-black pl-2 w-full col-span-3"} />

            <label htmlFor="password"
                   className="text-right text-blue-100 text-lg">Password:</label>
            <input type="password"
                   name="password"
                   id="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className={inputCs+" text-black pl-2 w-full col-span-3"} />

            <label htmlFor="confirm"
                   className="text-right text-blue-100 text-lg">Confirm Password:</label>
            <input type="password"
                   name="confirm"
                   id="confirm"
                   value={confirm}
                   onChange={(e) => setConfirm(e.target.value)}
                   className={inputCs+" text-black pl-2 w-full col-span-3"} />
          </div>
          { badEntries.map(err => <div className={errorMsgCs}> {err} </div> )  }
          { errorMsg && <div className={errorMsgCs}> {errorMsg} </div> }
          <button className={buttonCs+" mx-auto w-52 sm:w-64 md:w-72 lg:80 xl:96 bg-green-400 self-center"} type="submit">
            <p>Create</p>
          </button>
        </div>
      </form>
      {isAuthenticated && <Redirect to="/samples" />}
    </section>
  );

};

export default Create;
