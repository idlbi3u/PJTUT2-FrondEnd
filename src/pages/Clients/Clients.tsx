import { 
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonPage, 
    IonRow, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import React, { useState } from 'react';

interface Client {
    id: number;

}



const Clients: React.FC = () => 
{
    const [clients, setClients] = useState<Client[]>([]);

    const handleDeleteClient = (id: number) => {
        
    }
    const handleModifyClient = (id: number) => {
        
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/home' ></IonBackButton>
                    </IonButtons>
                    <IonTitle>Clients</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
                <IonGrid>
                    <IonRow>
                        <IonCol>Code</IonCol>
                        <IonCol>Statut</IonCol>
                        <IonCol>Clients</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>

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
                    
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Clients;