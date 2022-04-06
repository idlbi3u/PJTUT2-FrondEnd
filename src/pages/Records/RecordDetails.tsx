import { 
    IonBackButton, 
    IonButton, 
    IonButtons,  
    IonContent,  
    IonHeader, 
    IonIcon, 
    IonItem,  
    IonPage, 
    IonText, 
    IonTitle, 
    IonToolbar, 
    useIonAlert,         
} from '@ionic/react';
import {       
    pencilOutline, 
    pencilSharp,      
    trashBinOutline, 
    trashBinSharp 
} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import EditRecord from '../../components/Dossier/EditRecord';
import AddEvent from '../../components/Évènement/AddEvent';
import './RecordDetails.css';
import EventsCard from '../../components/Dossier/EventsCard';
import LawyercaseTotalTimeCard from '../../components/Dossier/LawyercaseTotalTimeCard';
import LawyercaseClientsCard from '../../components/Dossier/LawyercaseClientsCards';
import LawyercaseDetailsCard from '../../components/Dossier/LawyercaseDetailsCard';

interface ParamsInterface {
    id: string;
}
const RecordDetails: React.FC = () => {
    const params = useParams<ParamsInterface>();
    const [lawyercase, setLawyercase] = useState<ILawyercase>();
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ILawyercase>();
    const [present] = useIonAlert();

    const deleteRecord = (id: string) => {
        LawyercaseDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    const handleDeleteRecord = (id: string) => {
        deleteRecord(id);        
    }

    const handleModifyRecord = (record: any) => {
        setSelectedRecord(record)
        setIsEdit(true)
    }

    
    
    
    useEffect(() => {
        LawyercaseDataService.get(params.id)
            .then((response: any) => {
                setLawyercase(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        setDelete(false);
        
    }, [params.id, isEdit, Delete, isOpen]);   

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/records'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Dossier {' > ' + lawyercase?.ref} </IonTitle>
                </IonToolbar>
                <IonItem lines="none">
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifyRecord(lawyercase)
                            }}

                        >Modifier Dossier<IonIcon ios={pencilOutline} md={pencilSharp}/></IonButton>
                        <IonButton
                            color="danger"
                            slot="end"
                            onClick={() => {
                                present({
                                    cssClass: 'my-css',
                                    header: 'Suppression d\'un Dossier',
                                    message: 'êtes-vous sûr de vouloir supprimer ce Dossier ?',
                                    buttons: [
                                        {text: 'Annuler', role: 'cancel'},
                                        {text: 'Confirmer', handler: () => handleDeleteRecord(lawyercase?.id)}
                                    ],
                                })
                            }}
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>
                
                    {lawyercase ? (
                        <>    
                        <LawyercaseDetailsCard lawyercase={lawyercase}/>     
                        <LawyercaseClientsCard lawyercase={lawyercase} />
                        <EventsCard lawyercase={lawyercase}/>                         
                        <LawyercaseTotalTimeCard lawyercaseEvent={lawyercase.events}/>
                    
                        </>
                    ) 
                    : 
                    <IonItem>
                        <IonText color="danger">Ce dossier n'existe pas!</IonText>
                    </IonItem>
                }
            </IonContent>

            {selectedRecord ? (
                <EditRecord
                    lawyercase={selectedRecord}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}

            {lawyercase ? (
                <>
                    <AddEvent lawyercase={lawyercase}  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
                </>
            )  : null}
        </IonPage>
    );
}

export default RecordDetails;