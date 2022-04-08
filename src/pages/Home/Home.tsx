import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';


const Home: React.FC = () => {
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
