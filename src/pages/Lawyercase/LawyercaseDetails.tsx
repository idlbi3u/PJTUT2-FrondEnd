import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
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
    addOutline, 
    addSharp, 
    alertOutline, 
    alertSharp, 
    arrowBackOutline, 
    checkmarkCircle, 
    checkmarkSharp, 
    fileTrayOutline, 
    fileTraySharp, 
    pencilOutline, 
    pencilSharp, 
    personAddOutline, 
    personAddSharp, 
    personOutline, 
    personSharp, 
    trashBinOutline, 
    trashBinSharp
} from 'ionicons/icons';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import EditLawyercase from '../../components/Lawyercase/EditLawyercase';
import AddEvent from '../../components/Events/AddEvent';
import './LawyercaseDetails.css';
import EventsCard from '../../components/Lawyercase/EventsCard';
import AddClientToCaseModal from '../../components/Lawyercase/AddClientToLawyercase';
import ClientsCard from '../../components/Lawyercase/ClientsCard';
import TotalTimeCard from '../../components/Lawyercase/TotalTimeCard';
import DetailsCard from '../../components/Lawyercase/DetailsCard';
import {format, parseISO} from 'date-fns';
const isElectron = require('is-electron');

interface ParamsInterface {
    id: string;
}

const LawyercaseDetails: React.FC = () => {
    const params = useParams<ParamsInterface>();
    const [lawyercase, setLawyercase] = useState<ILawyercase>();
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [addEvent, setAddEvent] = useState(false);
    const [lawyercaseState, setLawyercaseState] = useState<boolean>(false);
    const [addClientModal, setAddClientModal] = useState(false)
    const [selectedLawyercase, setSelectedLawyercase] = useState<ILawyercase>();
    const [present] = useIonAlert();        

    const handleDeletelawyercase = (id: string) => {
        setIsDeleted(true);
        LawyercaseDataService.delete(id)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
    }

    const handleModifylawyercase = (lawyercase?: ILawyercase) => {
        setSelectedLawyercase(lawyercase)
        setIsEdit(true)
    }

    const formatDate = (value: string) => {
        if (value) {
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };


    const handleChangeStatus = (lawyercase: ILawyercase) => {
        setLawyercaseState(true);
        if (lawyercase.closed_at === null) {
            lawyercase.closed_at = formatDate(new Date().toISOString());

            LawyercaseDataService.updateStatus(lawyercase.id, lawyercase)
                .then(() => {
                })
                .catch((e: Error) => {
                })
        }
    }

    const getLawyercase = useCallback(
        () => {
            LawyercaseDataService.get(params.id)
            .then((response: any) => {
                if (isElectron()) {
                    console.log(response);                    
                    setLawyercase(response);
                } else {
                    setLawyercase(response.data);
                }
            })
            .catch((e: Error) => {
            }); 
        },
        [params.id]
    )

    useEffect(() => {
        getLawyercase();

        return () => {
            // cleanup
        };

    }, [present, isDeleted, isEdit, addClientModal, getLawyercase, lawyercaseState]);

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonButton routerLink='/lawyercases' routerDirection="back">
                            <IonIcon icon={arrowBackOutline}/></IonButton>
                    </IonButtons>
                    <IonTitle>Dossier {' > ' + lawyercase?.ref} </IonTitle>
                </IonToolbar>
                <IonItem lines="none">
                    <IonButtons slot="end">
                        <IonButton
                            disabled={!!lawyercase?.closed_at}
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifylawyercase(lawyercase)
                            }}
                        >Modifier Dossier<IonIcon ios={pencilOutline} md={pencilSharp}/></IonButton>
                        <IonButton
                            disabled={!!lawyercase?.closed_at}
                            color="danger"
                            slot="end"
                            onClick={() => {
                                present({
                                    cssClass: 'my-css',
                                    header: 'Suppression d\'un Dossier',
                                    message: 'êtes-vous sûr de vouloir supprimer ce Dossier ?',
                                    buttons: [
                                        {text: 'Annuler', role: 'cancel'},
                                        {text: 'Confirmer', handler: () => handleDeletelawyercase(lawyercase?.id)}
                                    ],
                                    onDidDismiss: (e) => {setIsDeleted(false)},
                                })
                            }}
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>

                {lawyercase ? (
                        <>
                            <IonCard>
                                <IonCardHeader>
                                    <IonItem lines='none'>
                                        <IonIcon ios={fileTrayOutline} md={fileTraySharp}/>
                                        <IonTitle>Détails Dossier {lawyercase.ref}</IonTitle>
                                        <IonButtons slot='end'>
                                            <IonButton color={lawyercase.closed_at ? "danger" : "success"}
                                                    disabled={!!lawyercase.closed_at}
                                                    onClick={() => {
                                                        present({
                                                            cssClass: 'my-css',
                                                            header: 'Clôture d\'un Dossier',
                                                            message: 'êtes-vous sûr de vouloir clôturer ce Dossier ?',
                                                            buttons: [
                                                                {text: 'Annuler', role: 'cancel'},
                                                                {text: 'Confirmer', handler: () => handleChangeStatus(lawyercase)}
                                                            ],
                                                            onDidDismiss: (e) => {setLawyercaseState(false)},
                                                        })
                                                    }}
                                            >
                                                Clôturer
                                                <IonIcon ios={checkmarkCircle} md={checkmarkSharp}/>
                                            </IonButton>
                                        </IonButtons>
                                    </IonItem>                                
                                </IonCardHeader>
                            <DetailsCard lawyercase={lawyercase}/>
                            </IonCard>   
                            <IonCard>
                                <IonCardHeader>
                                    <IonItem lines="none">
                                        <IonIcon ios={personOutline} md={personSharp}/>
                                        <IonTitle>Clients concernés</IonTitle>
                                        <IonButtons slot='end'>
                                            <IonButton disabled={!!lawyercase.closed_at} color='primary' onClick={() => {
                                                setAddClientModal(true)
                                            }}>
                                                <IonIcon color="primary" ios={personAddOutline} md={personAddSharp}/>
                                            </IonButton>
                                        </IonButtons>
                                    </IonItem>
                                </IonCardHeader>
                                <ClientsCard 
                                    lawyercaseClients={lawyercase.clients ?? []} 
                                    lawyercaseId={lawyercase.id} 
                                    lawyercaseState={!!!lawyercase.closed_at} 
                                    setIsDeleted={setIsDeleted}
                                />                               
                                <AddClientToCaseModal 
                                    lawyercaseClients={lawyercase.clients ?? []} 
                                    lawyercase={lawyercase}
                                    isOpen={addClientModal}
                                    setIsOpen={setAddClientModal}
                                />
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonItem lines="none">
                                        <IonIcon ios={alertOutline} md={alertSharp}/>
                                        <IonTitle>Évènements</IonTitle>
                                        <IonButtons slot='end'>
                                            <IonButton disabled={!!lawyercase.closed_at} routerDirection="root" color='primary' onClick={() => {                                                
                                                setAddEvent(true)
                                            }}>
                                                <IonIcon color="primary" ios={addOutline} md={addSharp}/>
                                            </IonButton>
                                        </IonButtons>
                                    </IonItem>
                                </IonCardHeader>
                                <EventsCard lawyercaseEvents={lawyercase.events ?? []}/>
                                <AddEvent 
                                lawyercase={lawyercase} 
                                isOpen={addEvent} 
                                setIsOpen={() => setAddEvent(false)}
                                getLawyercase={getLawyercase}
                                />
                            </IonCard>
                            <TotalTimeCard lawyercaseEvent={lawyercase.events}/>
                        </>
                    )
                    :
                    <IonItem>
                        <IonText color="danger">Ce dossier n'existe pas!</IonText>
                    </IonItem>
                }
            </IonContent>

            {selectedLawyercase ? (
                <EditLawyercase
                    lawyercase={selectedLawyercase}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}            
        </IonPage>
    );
}

export default LawyercaseDetails;