import React, { Component } from 'react';
// Import state stuff
import store from './store';
import { Provider } from 'react-redux';
// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import components
import Main from './components/main.js';

const App = () => {
  return (
  // Get the state from the store and provide it to the rest of the app
    <Provider store={store}>
      {/*Connect nav links to their routes via Browser Router*/}
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
