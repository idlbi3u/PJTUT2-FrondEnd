import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Records from './pages/Records/Records';
import Layout from './components/Layout/Layout';
import DetailsRecord from './pages/Records/DetailsRecord';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ClientDetails from './pages/Clients/ClientDetails';
import ClientListComponent from './components/clients/client-list.component';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>   
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Layout />
        <IonRouterOutlet class='ion-page' id='main'>
          <Route exact path="/home" component={Home} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/records" component={Records} />
          <Route exact path="/detailsrecord" component={DetailsRecord} />
          <Route exact path="/apiclitest" component={ClientListComponent} />
          <Route path="/clients/:id" children={ClientDetails} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
