import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    SearchbarChangeEventDetail,
    useIonAlert
} from '@ionic/react';
import {
    addOutline,
    eyedropOutline,
    eyeSharp,
    pencilOutline,
    pencilSharp,
    trashBinOutline,
    trashBinSharp
} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Clients.css';
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';
import EditClient from '../../components/Client/EditClient';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteClientReducer, getAllClientsReducer, setClientsList} from "../../redux/clients.reducer";

const Clients: React.FC = () => {

    //Redux Store
    const dispatch = useAppDispatch();
    const clientsList = useAppSelector((state) => state.clients.clients)

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [selectedClient, setSelectedClient] = useState<IClientData>();
    const [present] = useIonAlert();

    const handleDeleteClient = (id: string) => {
        setDelete(true);
        deleteClient(id);
    }

    const handleModifyClient = (client: any) => {
        setSelectedClient(client)
        setIsEdit(true)
    }

    const retrieveClients = () => {
        dispatch(getAllClientsReducer())
    }

    const deleteClient = (id: string) => {
        dispatch(deleteClientReducer(id))
        setDelete(false);
    }

    const handleSearchClient = (e: CustomEvent<SearchbarChangeEventDetail>) => {
        if (e.detail.value === "") {
            retrieveClients()
        }
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = clientsList.filter((e: IClientData) => {
                let nameTlc = e.name.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })
            dispatch(setClientsList(filterData))
        }
    }

    useEffect(() => {
        dispatch(getAllClientsReducer())
    }, [isOpen, isEdit, Delete]);

    console.log(clientsList);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none' slot='start'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home'/>
                        </IonButtons>
                        <IonTitle>Clients</IonTitle>
                    </IonItem>
                </IonToolbar>
                <IonItem lines='none'>
                    <IonSearchbar
                        onIonChange={(e) => handleSearchClient(e)}
                        class='search-bar'
                        type='text'
                        placeholder="Rechercher par nom"/>
                </IonItem>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton color='primary'
                                   onClick={() => {
                                       setIsOpen(true)
                                   }}>
                            <IonIcon icon={addOutline}/>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>Nom</IonCol>
                        <IonCol>Affaires Associées</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>

                    {clientsList.map((client: IClientData, index: number) => {
                        return (
                            <IonRow key={index}>
                                <IonCol>{client.name + ' ' + client.firstname}</IonCol>
                                <IonCol>12/333</IonCol>
                                <IonCol>
                                    <IonButtons>
                                        <IonButton href={'/clients/view/' + client.id}
                                                   color='success'>
                                            <IonIcon ios={eyedropOutline}
                                                     md={eyeSharp}/>
                                        </IonButton>
                                        <IonButton color='primary'
                                                   onClick={() => {
                                                       handleModifyClient(client)
                                                   }}>
                                            <IonIcon ios={pencilOutline}
                                                     md={pencilSharp}/>
                                        </IonButton>
                                        <IonButton color='danger' onClick={() => {
                                            present({
                                                cssClass: 'my-css',
                                                header: 'Suppression d\'un client',
                                                message: 'êtes-vous sûr de vouloir supprimer ce client ?',
                                                buttons: [
                                                    {text: 'Annuler', role: 'cancel'},
                                                    {text: 'Confirmer', handler: () => handleDeleteClient(client.id)}
                                                ],
                                            })
                                        }}>
                                            <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddClient
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
            />
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

export default Clients;