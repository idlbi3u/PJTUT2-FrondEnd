
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
    IonToolbar } from '@ionic/react';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp, addOutline, pencil, trash } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Clients.css';
import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';




const Clients: React.FC = () => 
{
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteClient = (id: number) => {
        
    }

    const handleModifyClient = (id: string) => {
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
    const deleteClient = (id:string) => {
        ClientDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
        })
            .catch((e:Error) => {
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
                            <IonBackButton defaultHref='/home' ></IonBackButton>
                        </IonButtons>
                    </IonItem>
                   
                    <IonTitle>Clients</IonTitle> 
                                      
                    <IonItem slot='end' lines='none'>
                        <IonSearchbar class='search-bar' type='text' animated={true}></IonSearchbar>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => {setIsOpen(true)}} >
                            <IonIcon icon={addOutline}></IonIcon>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>
                
                <IonGrid>
                    <IonRow>
                        <IonCol>Nom</IonCol>
                        <IonCol>Affaires associées</IonCol>
                        <IonCol>Actions
                            <IonButtons>
                                <IonButton >
                                    <IonIcon slot="icon-only" icon={pencil} />
                                </IonButton>
                                <IonButton>
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonButton>
                            </IonButtons>      
                        </IonCol>
                    </IonRow>

                    {clients.map((client: IClientData, index: number) => {

                        return(
                        <IonRow>
                            <IonCol>12/333</IonCol>
                            <IonCol>En Cours</IonCol>
                            <IonCol>{client.name + ' '+ client.firstname}</IonCol>
                            <IonCol>
                                <IonButtons>
                                    <IonButton onClick={() => {handleDeleteClient(client.id)}}>
                                        <IonIcon ios={trashBinOutline} md={trashBinSharp}></IonIcon>
                                    </IonButton>
                                    <IonButton onClick={() => {handleModifyClient(client.id)}}>
                                        <IonIcon ios={pencilOutline} md={pencilSharp}></IonIcon>
                                    </IonButton>
                                </IonButtons>
                            </IonCol>
                        </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddClient isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
        </IonPage>
    );
}

export default Clients;