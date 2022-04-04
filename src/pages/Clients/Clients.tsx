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
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    RefresherEventDetail,
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
import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';
import EditClient from '../../components/Client/EditClient';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getAllClients, setClientsList} from "../../redux/clients.reducer";

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
        dispatch(getAllClients())
    }

    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
        setDelete(false);
    }

    const handleSearchClient = (e: CustomEvent<SearchbarChangeEventDetail>) => {
        if (e.detail.value === "") {
            retrieveClients()
        }
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            console.log(tlc)
            let filterData = clientsList.filter((e: IClientData) => {
                let nameTlc = e.name.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })

            console.log(filterData);
            dispatch(setClientsList(filterData))
        }
    }

    //TODO : A remove?
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            retrieveClients();
            event.detail.complete();
        }, 2000);
    }

    useEffect(() => {
        dispatch(getAllClients())

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
                        <IonButton color='primary' onClick={() => {
                            setIsOpen(true)
                        }}>
                            <IonIcon icon={addOutline}/>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent>

                    </IonRefresherContent>
                </IonRefresher>
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
                                        <IonButton href={'/clients/view/' + client.id} color='success'>
                                            <IonIcon ios={eyedropOutline} md={eyeSharp}/>
                                        </IonButton>
                                        <IonButton color='primary' onClick={() => {
                                            handleModifyClient(client)
                                        }}>
                                            <IonIcon ios={pencilOutline} md={pencilSharp}/>
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