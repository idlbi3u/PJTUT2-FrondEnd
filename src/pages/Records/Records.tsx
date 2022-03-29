
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRoute, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import {   pencil,  trash,  } from 'ionicons/icons';
import React, { useState } from 'react';
import './Records.css';


interface Record {
    id: number;

}

const Records: React.FC = () =>
{
    const [records, setRecords] = useState<Record[]>([]);
    return (
        <IonPage>
            <IonHeader>      
                <IonToolbar>
                    <IonItem>
                        <IonTitle>Dossiers</IonTitle>
                        <IonItem className='Business'>   
                                <IonSelect placeholder="Selectionnez une catégorie d'affaire">
                                <IonSelectOption value="AllBusiness">Afficher affaires en cours et cloturées</IonSelectOption>
                                <IonSelectOption value="OnGoingBusiness">Afficher affaires en cours</IonSelectOption>
                                <IonSelectOption value="CompletedBusiness">Afficher affaires cloturées</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem className='SearchBar'>   
                                <IonSearchbar></IonSearchbar>
                            </IonItem>
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
                                <IonButton href='/detailsrecord'>
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
                <IonButton className='Pages' color="black">Previous</IonButton>
                <IonButton color="black">1</IonButton>
                <IonButton color="black">2</IonButton>
                <IonButton color="black">3</IonButton>
                <IonButton className='Pages' color="black">Next</IonButton>
                </IonButtons>
            </IonItem>
        </IonPage>
    );
}

export default Records;