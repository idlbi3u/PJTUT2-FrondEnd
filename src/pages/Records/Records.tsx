import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';


const Records: React.FC = () =>
{
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dossiers</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}

export default Records;