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
    IonToolbar
} from '@ionic/react';
import {addOutline, pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Clients.css';
import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';
import EditClient from "../../components/clients/edit-client";


const Clients: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const handleDeleteClient = (id: string) => {
        deleteClient(id);
    }

    const [clients, setClients] = useState<IClientData[]>([]);

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    useEffect(() => {
        retrieveClients();

    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none' slot='start'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home'/>
                        </IonButtons>
                    </IonItem>

                    <IonTitle>Clients</IonTitle>

                    <IonItem slot='end' lines='none'>
                        <IonSearchbar class='search-bar' type='text' animated={true}/>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => {
                            setIsOpen(true)
                        }}>
                            <IonIcon icon={addOutline}/>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>

                <IonGrid>
                    <IonRow>
                        <IonCol>Code</IonCol>
                        <IonCol>Statut</IonCol>
                        <IonCol>Clients</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    {clients.map((client: IClientData, index: number) => {

                        return (
                            <IonRow key={index}>
                                <IonCol>12/333</IonCol>
                                <IonCol>En Cours</IonCol>
                                <IonCol>{client.name + ' ' + client.firstname}</IonCol>
                                <IonCol>
                                    <IonButtons>
                                        <IonButton onClick={() => {
                                            handleDeleteClient(client.id)
                                        }}>
                                            <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                                        </IonButton>
                                        <IonButton onClick={() => {
                                            setSelectedClient(client)
                                            setIsEdit(true)
                                        }}>
                                            <IonIcon ios={pencilOutline} md={pencilSharp}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddClient isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            <EditClient
                client={selectedClient}
                isOpen={isEdit}
                setIsOpen={() => setIsEdit(false)}
            />)

        </IonPage>
    );
}

export default Clients;