import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Lawyercase from './pages/Lawyercase/Lawyercase';
import Layout from './components/Layout/Layout';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ClientDetails from './pages/Clients/ClientDetails';
import LawyercaseDetails from './pages/Lawyercase/LawyercaseDetails';


setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonSplitPane contentId="main">
                <Layout/>
                <IonRouterOutlet class='ion-page' id='main'>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/clients" component={Clients}/>
                    <Route exact path="/lawyercases" component={Lawyercase}/>
                    <Route exact path="/lawyercases/view/:id" component={LawyercaseDetails}/>
                    <Route path="/clients/view/:id" component={ClientDetails}/>
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
    </IonApp>
);
export default App;
