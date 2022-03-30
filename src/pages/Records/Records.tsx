
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRoute, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import {   addOutline, pencil,  trash,  } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Records.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';
import AddRecord from '../../components/Dossier/AddRecord'


const Records: React.FC = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteRecord = (id: number) => {
        
    }

    const handleModifyRecord = (id: string) => {
        deleteRecord(id);
    }

    const [records, setRecords] = useState<ILawyercase[]>([]);

    const retrieveRecords = () => {
        LawyercaseDataService.getAll()
            .then((response: any) => {
                setRecords(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteRecord = (id:string) => {
        LawyercaseDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
        })
            .catch((e:Error) => {
                console.log(e)
            })
    }

    useEffect(() => {
        retrieveRecords();  

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
                    <IonItem>
                        <IonTitle>Dossiers</IonTitle>
                        <IonItem className='Business' lines='none'>   
                                <IonSelect placeholder="Selectionnez une catégorie d'affaire">
                                <IonSelectOption value="AllBusiness">Afficher affaires en cours et cloturées</IonSelectOption>
                                <IonSelectOption value="OnGoingBusiness">Afficher affaires en cours</IonSelectOption>
                                <IonSelectOption value="CompletedBusiness">Afficher affaires cloturées</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem className='SearchBar' lines='none'>   
                                <IonSearchbar class='search-bar' type='text' animated={true}></IonSearchbar>
                            </IonItem>
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
            <AddRecord isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
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