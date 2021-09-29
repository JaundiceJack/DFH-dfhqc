// Import basics
//import { useDispatch } from 'react-redux';
// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
//import Manage        from './manage/manage';
import Home       from './home';
import RawSummary from './pages/raw/rawSummary';
import LotSummary from './pages/samples/lotSummary';
import BlendSummary from './pages/blend/blendSummary';
import BulkSummary from './pages/bulk/bulkSummary';
import FgSummary from './pages/fg/fgSummary';
//import Login         from './account/login';
//import Forgot        from './account/forgot';
//import Reset         from './account/reset';
//import CreateAccount from './account/create';

const Routes = () => {
  // Handle the reset password route
  //const history = useHistory();
  //const dispatch = useDispatch();

  return (
    <Switch>
      <Route exact path="/"        component={Home} />
      <Route exact path="/raws"    component={RawSummary} />
      <Route exact path="/blends"  component={BlendSummary} />
      <Route exact path="/bulks"   component={BulkSummary} />
      <Route exact path="/fgs"     component={FgSummary} />
      <Route exact path="/samples" component={LotSummary} />
    </Switch>
  )
}


/*
<Route exact path="/login"  component={Login} />
<Route exact path="/forgot" component={Forgot} />
<Route path="/reset/:token" component={Reset} />
<Route exact path="/create" component={CreateAccount} />
<Route exact path="/manage" component={Manage} />
*/


export default Routes;
