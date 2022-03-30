import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';


const Records: React.FC = () =>
{
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/home'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Dossiers</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}

export default Records;