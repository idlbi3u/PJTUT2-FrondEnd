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
    IonRouterLink,
    IonRow,
    IonSearchbar,
    IonText,
    IonTitle,
    IonToolbar,
    SearchbarChangeEventDetail,
    useIonAlert
} from '@ionic/react';
import {addOutline, pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Clients.css';
import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';
import EditClient from '../../components/Client/EditClient';
const isElectron = require('is-electron');


const Clients: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [clients, setClients] = useState<IClientData[]>([]);
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
        ClientDataService.getAll()
        .then((response: any) => {
            if(isElectron()) {
                setClients(response)
            } else {
                setClients(response.data)
            }
        })
        .catch((e: Error) => {
        })
    }     
  
    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
        setDelete(false);
    }

    const handleSearchClient = async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        if (e.detail.value === "") {
            retrieveClients()
        }

        await ClientDataService.getAll()
            .then((response: any) => {
                if(isElectron()) {
                    setClients(response)
                } else {
                    setClients(response.data)
                }
            })
            .catch((e: Error) => {
            });
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = clients.filter((e) => {
                let nameTlc = e.name.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })
            setClients(filterData)
        }
    }

    useEffect(() => {
        retrieveClients();
        return () => {
        };

    }, [isOpen, isEdit, Delete]);


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
                <IonGrid>
                    <IonRow>
                        <IonCol>Nom</IonCol>
                        <IonCol>Affaires Associées</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    {clients.map((client: IClientData, index: number) => {
                        return (
                            <IonRow key={index}>
                                <IonCol>
                                    <IonRouterLink className='link' routerDirection="back"
                                                   routerLink={'clients/view/' + client.id}>
                                        <IonText>
                                            {client.name + ' ' + client.firstname}
                                        </IonText>
                                    </IonRouterLink>
                                </IonCol>
                                <IonCol>
                                    {client.lawyercases?.length}
                                </IonCol>
                                <IonCol>
                                    <IonButtons>
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
                                                onDidDismiss: (e) => {setDelete(false)},
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
            <IonItem>
                <IonButtons slot="end">
                    <IonButton className='Pages' color="black">Previous</IonButton>
                    <IonButton color="black">1</IonButton>
                    <IonButton color="black">2</IonButton>
                    <IonButton color="black">3</IonButton>
                    <IonButton className='Pages' color="black">Next</IonButton>
                </IonButtons>
            </IonItem>
        </IonPage>
    );
}

export default Clients;