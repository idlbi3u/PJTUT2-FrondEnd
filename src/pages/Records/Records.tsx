
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRouterLink, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, SearchbarChangeEventDetail, useIonAlert } from '@ionic/react';
import {   addOutline, ellipse, eyedropOutline, eyeSharp,   pencilOutline,  pencilSharp,   trashBinOutline, trashBinSharp,  } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Records.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';
import AddRecord from '../../components/Dossier/AddRecord'
import EditRecord from '../../components/Dossier/EditRecord';
const isElectron = require("is-electron");

const Records: React.FC = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [present] = useIonAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ILawyercase>();
    const [records, setRecords] = useState<ILawyercase[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<ILawyercase[]>(records);
    const [filter, setFilter] = useState<string>("AllBusiness");
    

    const handleDeleteRecord = (id: string) => {
        setDelete(true);
        deleteRecord(id);
    }

    const handleModifyRecord = (record: any) => {
        setSelectedRecord(record)
        setIsEdit(true)
    }
    

    const retrieveRecords = () => {
        LawyercaseDataService.getAll()
            .then((response: any) => {
                if (isElectron()) {
                    setRecords(response)
                } else {
                    setRecords(response.data)
                }
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

    const handleSearchRecord = async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        if (e.detail.value === "") {
            retrieveRecords()
        }

        await LawyercaseDataService.getAll()
            .then((response: any) => {
                if (isElectron()) {
                    setRecords(response)
                } else {
                    setRecords(response.data)
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = records.filter((e) => {
                let nameTlc = e.ref.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })

            setRecords(filterData)
        }

    }

    useEffect(() => {
        retrieveRecords();  

    }, [isOpen, isEdit, Delete, setRecords]);


    useEffect(() => {
        if (filter === "AllBusiness") {
            setFilteredRecords(records);
        } else if (filter === "OnGoingBusiness") {
            setFilteredRecords(records.filter(record => !record.state));
        } else {
            setFilteredRecords(records.filter(record => record.state));
        }
    },[filter, records]);
  

    return (
        <IonPage>
            <IonHeader>      
                <IonToolbar>
                    <IonItem lines='none'>
                    <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home' ></IonBackButton>
                        </IonButtons>
                        <IonTitle>Dossiers</IonTitle>
                    </IonItem>
                    <IonItem>
                        <IonItem slot='start' className='Business' lines='none'>   
                                <IonSelect placeholder="Selectionnez une catégorie d'affaire" value={filter} onIonChange={e => setFilter(e.detail.value)}>
                                    <IonSelectOption value="AllBusiness">Toutes les affaires</IonSelectOption>
                                    <IonSelectOption value="OnGoingBusiness">Affaires en cours</IonSelectOption>
                                    <IonSelectOption value="CompletedBusiness">Affaires cloturées</IonSelectOption>
                                </IonSelect>
                        </IonItem>
                        <IonItem slot='end' className='SearchBar' lines='none'>   
                            <IonSearchbar
                                onIonChange={(e) => handleSearchRecord(e)}
                                class='search-bar'
                                type='text'
                                placeholder="Rechercher par nom de dossier"/>
                        </IonItem>
                    </IonItem>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton color='primary' onClick={() => {setIsOpen(true)}} >
                            <IonIcon icon={addOutline}></IonIcon>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>
                <IonGrid>
                    <IonRow className='Row'>
                        <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions</IonCol>
                    </IonRow>
                    {filteredRecords.map((record: ILawyercase, index: number) => {
                        return (
                            <IonRouterLink key={index} routerLink={'/records/view/'+record.id}>
                                <IonRow className='Row' >
                                    <IonCol className='Col'>{record.ref}</IonCol>
                                    <IonCol className='Col'><IonIcon color={record.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse} /></IonCol>
                                    <IonCol className='Col'>
                                        { record.clients?.length }
                                    </IonCol>
                                    <IonCol className='Col'>
                                    <IonButtons>
                                            <IonButton color='success'>
                                                    <IonIcon ios={eyedropOutline} md={eyeSharp}/>
                                            </IonButton>
                                            <IonButton color='primary' onClick={() => {
                                                handleModifyRecord(record)
                                            }}>
                                                <IonIcon ios={pencilOutline} md={pencilSharp}/>
                                            </IonButton>
                                            <IonButton color='danger' onClick={() => {
                                                present({
                                                    cssClass: 'my-css',
                                                    header: 'Suppression d\'un client',
                                                    message: 'êtes-vous sûr de vouloir supprimer ce dossier ?',
                                                    buttons: [
                                                        {text: 'Annuler', role: 'cancel'},
                                                        { text: 'Oui', handler: () => handleDeleteRecord(record.id)}
                                                    ],
                                                })
                                            }}>
                                                <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                                            </IonButton>
                                        </IonButtons>
                                    </IonCol>
                                </IonRow>
                            </IonRouterLink>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddRecord  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            {selectedRecord ? (
                <EditRecord
                    record={selectedRecord}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}
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