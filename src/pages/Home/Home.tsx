import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';

let isElectron = require('is-electron');

const Home: React.FC = () => {

    if (isElectron()) {
        console.log("On est sur Electron")
    } else {
        console.log(' On est en Web / ionic')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="home_main" fullscreen id='main'>
                <h1>LAWYER FIRM PROJECT</h1>
                <img src="http://spiritgamer.fr/wp-content/uploads/2018/02/29755-1080x675.jpg" alt="avocats"/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
