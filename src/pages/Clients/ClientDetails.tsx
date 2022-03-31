import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ClientCard from "../../components/Client/ClientCard";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service"
import './ClientDetails.css';

interface ParamsInterface{
    id: string;
}

const ClientDetails = () => {
    const params = useParams<ParamsInterface>();
    console.log(params.id);
    const [client, setClient] = useState<IClientData>();

    useEffect(() => {
        ClientDataService.get(params.id)
            .then((response: any) => {
                console.log('client :')
                console.log(response.data)
                setClient(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [params.id]);

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
                {client ? <ClientCard client={client}/> : <div>Erreur!</div>}
            </IonContent>
        </IonPage>
    );
}

export default ClientDetails;