import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import React, { useState } from 'react';

const DetailsRecord: React.FC = () =>
{
    interface DetailRecord {
        id: number;
    
    }
    
    const [detailrecord, setDetailRecord] = useState<DetailRecord[]>([]);
    return (
        <IonPage>
            <IonHeader>      
                <IonToolbar>
                    <IonItem>
                        <IonTitle>Dossier</IonTitle>
                        <IonButtons>
                            <IonButton >
                                <IonIcon slot="icon-only" icon={pencil} />
                            </IonButton>
                            <IonButton>
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonButton>
                            </IonButtons>   
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow className='Row'>
                        <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions
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
                    <IonRow className='Row'>
                    <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions
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
                    <IonRow className='Row'>
                    <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions
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
                </IonGrid>
            </IonContent>
            <IonItem>
                <IonButtons slot="end">
                <IonButton color="black">Previous</IonButton>
                <IonButton color="black">1</IonButton>
                <IonButton color="black">2</IonButton>
                <IonButton color="black">3</IonButton>
                <IonButton color="black">Next</IonButton>
                </IonButtons>
            </IonItem>
        </IonPage>
    );
}

export default DetailsRecord;