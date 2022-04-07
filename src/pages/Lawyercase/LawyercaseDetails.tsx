import {
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
import {arrowBackOutline, pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import EditLawyercase from '../../components/Lawyercase/EditLawyercase';
import AddEvent from '../../components/Events/AddEvent';
import './LawyercaseDetails.css';
import EventsCard from '../../components/Lawyercase/LawyercaseEventsCard';
import LawyercaseTotalTimeCard from '../../components/Lawyercase/LawyercaseTotalTimeCard';
import LawyercaseClientsCard from '../../components/Lawyercase/LawyercaseClientsCards';
import LawyercaseDetailsCard from '../../components/Lawyercase/LawyercaseDetailsCard';
const isElectron = require('is-electron');

interface ParamsInterface {
    id: string;
}

const LawyercaseDetails: React.FC = () => {
    const params = useParams<ParamsInterface>();
    const [lawyercase, setLawyercase] = useState<ILawyercase>();
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [selectedLawyercase, setSelectedLawyercase] = useState<ILawyercase>();
    const [present] = useIonAlert();

    const deletelawyercase = (id: string) => {
        LawyercaseDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    const handleDeletelawyercase = (id: string) => {
        deletelawyercase(id);
    }

    const handleModifylawyercase = (lawyercase?: ILawyercase) => {
        setSelectedLawyercase(lawyercase)
        setIsEdit(true)
    }

    useEffect(() => {
        LawyercaseDataService.get(params.id)
            .then((response: any) => {
                if (isElectron()) {
                    setLawyercase(response);
                } else {
                    setLawyercase(response.data);
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
        setDelete(false);

        return () => {
            console.log("unmount LawyercaseDetails");
        };

    }, [params.id, isEdit, Delete, isOpen]);

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
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifylawyercase(lawyercase)
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
                                        {text: 'Confirmer', handler: () => handleDeletelawyercase(lawyercase?.id)}
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
                            <LawyercaseClientsCard lawyercase={lawyercase}/>
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

            {selectedLawyercase ? (
                <EditLawyercase
                    lawyercase={selectedLawyercase}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}


            {lawyercase ? (
                <>
                    <AddEvent lawyercase={lawyercase} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
                </>
            ) : null}
        </IonPage>
    );
}

export default LawyercaseDetails;