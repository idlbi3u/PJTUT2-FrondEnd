import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
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
                    <IonItem>
                        <IonTitle>Clients</IonTitle>
                        <IonItem className='SearchBar'>   
                                <IonSearchbar></IonSearchbar>
                            </IonItem>
                    </IonItem>  
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
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