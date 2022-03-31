import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ClientCard from "../../components/Client/ClientCard";
import IClientData from "../../types/client.type";
import './ClientDetails.css';


const ClientDetails = () => {
    const params = useParams();
    console.log(params);
    const [client, setClient] = useState<IClientData>();

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
                {/* {client ? <ClientCard client={client}/> : <div>Erreur!</div>}                 */}
            </IonContent>
        </IonPage>
    );
}

export default ClientDetails;