// Import basics
//import { useDispatch } from 'react-redux';
// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
//import Manage        from './manage/manage';
import Home         from './home.js';
import RawSummary   from './pages/raw/rawSummary.js';
import LotSummary   from './pages/lot/lotSummary.js';
import BlendSummary from './pages/blend/blendSummary.js';
import BulkSummary  from './pages/bulk/bulkSummary.js';
import FgSummary    from './pages/fg/fgSummary.js';
import Login        from './account/login.js';
import LabSummary   from './pages/lab/labSummary.js';
import Forgot        from './account/forgot';
//import Reset         from './account/reset';
import CreateAccount from './account/create';

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
      <Route exact path="/login"   component={Login} />
      <Route exact path="/create"   component={CreateAccount} />
      <Route exact path="/labs"   component={LabSummary} />
      <Route exact path="/forgot"   component={Forgot} />
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
