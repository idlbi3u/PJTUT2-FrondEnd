import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert
} from "@ionic/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import ClientCard from "../../components/Client/ClientCard";
import IClientData from "../../types/client.type";
import './ClientDetails.css';
import {pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from "ionicons/icons";
import EditClient from "../../components/Client/EditClient";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteClientReducer, getSelectedClientReducer} from "../../redux/clients.reducer";

interface ParamsInterface {
    id: string;
}

const ClientDetails = () => {
    const dispatch = useAppDispatch();
    const params = useParams<ParamsInterface>();
    const selectedClientReducer = useAppSelector(state => state.clients.selectedClient);
    console.log(selectedClientReducer)

    /*
        const [client, setClient] = useState<IClientData>();
    */


    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [present] = useIonAlert();
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const deleteClient = (id: string) => {
        dispatch(deleteClientReducer(id));
        setDelete(false);
    }

    const handleDeleteClient = (id: string) => {
        setDelete(true);
        deleteClient(id);
    }

    const handleModifyClient = (client: any) => {
        setSelectedClient(client)
        setIsEdit(true)
    }

    useEffect(() => {
        dispatch(getSelectedClientReducer(params.id));
    }, []);

    console.log(selectedClientReducer.name)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/clients'/>
                    </IonButtons>
                    <IonTitle>Clients {selectedClientReducer.name + selectedClientReducer.firstname} </IonTitle>
                </IonToolbar>
                <IonItem lines="none">
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifyClient(selectedClientReducer)
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
                                        {text: 'Confirmer', handler: () => handleDeleteClient(selectedClientReducer.id)}
                                    ],
                                })

                            }}
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>
                {selectedClientReducer ?
                    <ClientCard client={selectedClientReducer}/> :
                    <IonItem>
                        <IonText color="danger">Ce client n'existe pas!</IonText>
                    </IonItem>
                }
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