import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

interface Client {
    id: number;

}
const Clients: React.FC = () => 
{
    const [clients, setClients] = useState<Client[]>([]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Clients</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
                <IonGrid>
                    <IonRow>
                        <IonCol>Nom</IonCol>
                        <IonCol>Affaires associées</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Nom</IonCol>
                        <IonCol>Affaires associées</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Clients;