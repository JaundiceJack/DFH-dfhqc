// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
import Home from './home.js';
import Login  from './account/login.js';
import Forgot from './account/forgot.js';
import Create from './account/create';
import RawSummary    from './pages/raw/_rawSummary.js';
import LotSummary    from './pages/lot/_lotSummary.js';
import BlendSummary  from './pages/blend/_blendSummary.js';
import BulkSummary   from './pages/bulk/_bulkSummary.js';
import FgSummary     from './pages/fg/_fgSummary.js';
import LabSummary    from './pages/lab/_labSummary.js';
import VendorSummary from './pages/vendor/_vendorSummary.js';
import ManuSummary   from './pages/manufacturer/_manuSummary.js';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/"        component={Home} />
      <Route exact path="/login"   component={Login} />
      <Route exact path="/forgot"  component={Forgot} />
      <Route exact path="/create"  component={Create} />
      <Route exact path="/raws"    component={RawSummary} />
      <Route exact path="/blends"  component={BlendSummary} />
      <Route exact path="/bulks"   component={BulkSummary} />
      <Route exact path="/fgs"     component={FgSummary} />
      <Route exact path="/samples" component={LotSummary} />
      <Route exact path="/labs"    component={LabSummary} />
      <Route exact path="/vendors" component={VendorSummary} />
      <Route exact path="/manufacturers" component={ManuSummary} />
    </Switch>
  )
}

export default Routes;
