import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonText, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ClientCard from "../../components/Client/ClientCard";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service"
import './ClientDetails.css';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp } from "ionicons/icons";
import EditClient from "../../components/Client/EditClient";

interface ParamsInterface{
    id: string;
}

const ClientDetails = () => {
    const params = useParams<ParamsInterface>();
    const [client, setClient] = useState<IClientData>();
    const [isEdit, setIsEdit] = useState(false);
    const [present] = useIonAlert();
    const [selectedClient, setSelectedClient] = useState<IClientData>();


    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    const handleDeleteClient = (id: string) => {
        deleteClient(id);
    }

    const handleModifyClient = (client: any) => {        
        setSelectedClient(client)
        setIsEdit(true)
    }

    useEffect(() => {
        ClientDataService.get(params.id)
            .then((response: any) => {
                setClient(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [params.id, isEdit]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/clients'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Détail Client </IonTitle>
                </IonToolbar>
                <IonItem  lines="none">
                    <IonButtons slot="end">
                        <IonButton 
                        color="primary" 
                        slot="start"
                        onClick={() => {
                            handleModifyClient(client)
                        }}
                        
                        >Modifier<IonIcon ios={pencilOutline} md={pencilSharp}/></IonButton>
                        <IonButton 
                        color="danger" 
                        slot="end"
                        onClick={() => {
                            present({
                                cssClass: 'my-css',
                                header: 'Suppression d\'un Client',
                                message: 'êtes-vous sûr de vouloir supprimer ce Client ?',
                                buttons: [
                                    {text: 'Annuler', role: 'cancel'},
                                    { text: 'Confirmer', handler: () => handleDeleteClient(client?.id)}
                                ],                        
                                })
                            
                        }}
                        
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>
                {client ? <ClientCard client={client}/> : <IonText color="danger">Erreur, ce client n'existe pas!</IonText>}
            </IonContent>

            {selectedClient ? (
                <EditClient
                    client={selectedClient}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}
        </IonPage>
    );
}

export default ClientDetails;