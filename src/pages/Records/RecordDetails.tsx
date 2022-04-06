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
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonRouterLink,     
} from '@ionic/react';
import {   
    addOutline, 
    addSharp, 
    alertOutline, 
    alertSharp, 
    calendarClearOutline, 
    calendarClearSharp,   
    checkmarkCircle, 
    checkmarkSharp, 
    ellipse, 
    fileTrayFullOutline, 
    fileTrayFullSharp, 
    pencilOutline, 
    pencilSharp, 
    personAddOutline,
    personAddSharp, 
    personOutline, 
    personSharp, 
    timeOutline, 
    timeSharp, 
    trashBinOutline, 
    trashBinSharp 
} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import EditRecord from '../../components/Dossier/EditRecord';
import AddEvent from '../../components/Évènement/AddEvent';
import AddClientToCaseModal from '../../components/Dossier/AddClientToCase';
import {format, parseISO} from 'date-fns';
import lawyercaseService from '../../services/lawyercase.service';
import './RecordDetails.css';
import IEventData from '../../types/event.type';
import IClientData from '../../types/client.type';
const isElectron = require('is-electron');

interface ParamsInterface {
    id: string;
}
const RecordDetails: React.FC = () => {
    const params = useParams<ParamsInterface>();
    const [record, setRecord] = useState<ILawyercase>();
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [addClientModal, setAddClientModal] = useState(false)
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

    const formatDate = (value?: string) => {
        if(value){
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    const handleDeleteClient = (clientId: string) => {
        lawyercaseService.removeClient(record?.id, clientId)
        setDelete(true);
    }
    
    const handleEndLawyercase = (client: IClientData) => {

    }

    useEffect(() => {
        LawyercaseDataService.get(params.id)
            .then((response: any) => {
                if (isElectron()) {
                    setRecord(response)
                } else {
                    setRecord(response.data);
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
        setDelete(false);
        
    }, [params.id, isEdit, Delete, isOpen, addClientModal]);   

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/records'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Dossier {' > ' + record?.ref} </IonTitle>
                </IonToolbar>
                <IonItem lines="none">
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifyRecord(record)
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
                                        {text: 'Confirmer', handler: () => handleDeleteRecord(record?.id)}
                                    ],
                                })
                            }}
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>
                
                    {record ? (
                        <>    
                        <IonCard>
                            <IonCardContent>
                                <IonItem lines="none">
                                        <IonIcon />
                                        <IonTitle>{record.ref}</IonTitle>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonIcon color={record.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse} />
                                    <IonTitle>{record.closed_at ? "Clôturé" : "En cours"}</IonTitle>
                                    <IonButton  color={record.closed_at ? "danger" : "success"} disabled={record.closed_at ? true : false}>Clôturer<IonIcon ios={checkmarkCircle} md={checkmarkSharp} /></IonButton>
                                </IonItem>
                                {record.createdAt ? (
                                    <IonItem lines="none">
                                            <IonIcon ios={calendarClearOutline} md={calendarClearSharp}/>
                                            <IonTitle>{formatDate(record.createdAt)}</IonTitle>
                                    </IonItem>
                                ) : null}
                            </IonCardContent>
                        </IonCard>
            
                        <IonCard>
                            <IonCardHeader>
                                <IonItem lines="none">
                                    <IonIcon ios={fileTrayFullOutline} md={fileTrayFullSharp}/>
                                    <IonTitle>Description</IonTitle>
                                </IonItem>
                            </IonCardHeader>
            
                            <IonCardContent>
                                <IonText>
                                    <h2>{record.description}</h2>
                                </IonText>
                            </IonCardContent>
                        </IonCard>
            
                        <IonCard>
                            <IonCardHeader>
                                <IonItem lines="none">
                                    <IonIcon ios={personOutline} md={personSharp}/>
                                    <IonTitle>Clients concernés</IonTitle>
                                    <IonButtons slot='end'>
                                        <IonButton color='primary' onClick={() => {setAddClientModal(true)}} >
                                            <IonIcon color="primary" ios={personAddOutline} md={personAddSharp} />
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                            </IonCardHeader>
            
                            <IonCardContent>
                                {record.clients?.map((client, index) => (
                                    <IonItem lines="none" key={index}>   
                                        <IonItem lines="none">
                                            <IonButton color="danger" onClick={() => {
                                                present({
                                                    cssClass: 'my-css',
                                                    header: 'Suppression d\'un client',
                                                    message: 'êtes-vous sûr de vouloir supprimer ce client ?',
                                                    buttons: [
                                                    {text: 'Annuler', role: 'cancel'},
                                                    { text: 'Confirmer', handler: () => handleDeleteClient(client.id)}
                                                    ],                        
                                                }) 
                                                }}>
                                                <IonIcon ios={trashBinOutline} md={trashBinSharp} />
                                            </IonButton>
                                        </IonItem>
                                        <IonLabel>
                                            <IonRouterLink class='link' routerLink={'/clients/view/' + client.id}>
                                                {client.name + ' ' + client.firstname}
                                            </IonRouterLink>
                                        </IonLabel>
                                    </IonItem>
                                ))}                    
                            </IonCardContent>
                        </IonCard>

                        <IonCard>
                            <IonCardHeader>
                                <IonItem lines="none">
                                    <IonIcon ios={alertOutline} md={alertSharp}/>
                                    <IonTitle>Évènements</IonTitle>
                                    <IonButtons slot='end'>
                                        <IonButton color='primary' onClick={() => {setIsOpen(true)}} >
                                            <IonIcon color="primary" ios={addOutline} md={addSharp} />
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>                               
                            </IonCardHeader>                                    
                            <IonCardContent>
                                <IonGrid>
                                    {record.events?.map((event: IEventData, index: number) => {
                                        return(
                                            <IonRow key={index}>
                                                <IonCol>{formatDate(event.createdAt)}</IonCol>                                                
                                                <IonCol>{event.duration}</IonCol>                                           
                                                <IonCol>{event.description}</IonCol> 
                                            </IonRow>
                                        )
                                    })}                                    
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                        
                        <IonCard>
                            <IonCardHeader>
                                <IonItem lines="none">
                                    <IonIcon ios={timeOutline} md={timeSharp}/>
                                    <IonTitle>Total : Temps en heures</IonTitle>
                                </IonItem>
                            </IonCardHeader>
            
                            <IonCardContent>
                                
                            </IonCardContent>
                        </IonCard>                     
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
                    record={selectedRecord}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}

            {record ? (
                <>
                    <AddClientToCaseModal recordClients={record.clients ?? []} record={record} isOpen={addClientModal} setIsOpen={setAddClientModal}/>
                    <AddEvent record={record}  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
                </>
            )  : null}
        </IonPage>
    );
}

export default RecordDetails;