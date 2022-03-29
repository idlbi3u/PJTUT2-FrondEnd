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
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp, addOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import AddClient from './AddClient';
import './Clients.css';

interface Client {
    id: number;

}



const Clients: React.FC = () => 
{
    const [clients, setClients] = useState<Client[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteClient = (id: number) => {
        
    }

    const handleModifyClient = (id: number) => {
        
    }


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
                        <IonCol>Code</IonCol>
                        <IonCol>Statut</IonCol>
                        <IonCol>Clients</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    {/* DATA MAP */}
                    <IonRow>
                        <IonCol>12/333</IonCol>
                        <IonCol>En Cours</IonCol>
                        <IonCol>Abdoul Alim</IonCol>
                        <IonCol>
                            <IonButtons>
                                <IonButton onClick={() => {handleDeleteClient(1)}}>
                                    <IonIcon ios={trashBinOutline} md={trashBinSharp}></IonIcon>
                                </IonButton>
                                <IonButton onClick={() => {handleModifyClient(1)}}>
                                    <IonIcon ios={pencilOutline} md={pencilSharp}></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonCol>
                    </IonRow>
                    {/* END */}
                </IonGrid>
            </IonContent>
            <AddClient isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
        </IonPage>
    );
}

export default Clients;