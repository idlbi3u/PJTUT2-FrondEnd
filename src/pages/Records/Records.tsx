import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';


interface Record {
    id: number;

}

const Records: React.FC = () =>
{
    const [records, setRecords] = useState<Record[]>([]);
    return (
        <IonPage>
            <IonHeader>   
            <IonTitle>Dossiers</IonTitle>
            <IonToolbar>
                <IonItem>   
                        <IonSelect placeholder="Selectionnez une catégorie d'affaire">
                        <IonSelectOption value="AllBusiness">Afficher affaires en cours et cloturées</IonSelectOption>
                        <IonSelectOption value="OnGoingBusiness">Afficher affaires en cours</IonSelectOption>
                        <IonSelectOption value="CompletedBusiness">Afficher affaires cloturées</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>   
                      
                        <IonSearchbar></IonSearchbar>
                    </IonItem>
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
                        <IonCol>Code</IonCol>
                        <IonCol>Statut</IonCol>
                        <IonCol>Clients</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Records;