import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonContent, IonHeader, IonItem, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Records from './pages/Records/Records';
import Layout from './components/Layout/Layout';

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
import ClientComponent from "./components/clients/client.component";
import ClientListComponent from "./components/clients/client-list.component";
import addClientComponent from "./components/clients/add-client.component";


setupIonicReact();

const App: React.FC = () => (
  <IonApp>   
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Layout />
        <IonRouterOutlet class='ion-page' id='main'>
          <Route exact path="/home" component={Home} />
          <Route exact path="/apicli" component={ClientListComponent} />
          <Route exact path="/add" component={addClientComponent} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/records" component={Records} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
