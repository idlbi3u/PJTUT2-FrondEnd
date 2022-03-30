import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";
import './ClientDetails.css';


const ClientDetails = () => {
    const params = useParams();
    console.log(params);
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/clients'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Détail Client </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
            </IonContent>
        </IonPage>
    );
}

export default ClientDetails;