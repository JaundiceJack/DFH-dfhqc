import React, { Component } from 'react';
// Import state stuff
import store from './store';
import {Provider} from 'react-redux';
// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import components
import Nav    from './components/nav';
import Routes from './components/routes';

class App extends Component {
  render() {
    return (
    // Get the state from the store and provide it to the rest of the app
      <Provider store={store}>
        {/*Connect nav links to their routes via Browser Router*/}
        <BrowserRouter>
          <main className={"flex flex-col 2xl:flex-row min-h-screen" +
                           " bg-gradient-to-br from-black via-gray-900 to-blue-900"}>
            <Nav />
            <Routes />
          </main>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
