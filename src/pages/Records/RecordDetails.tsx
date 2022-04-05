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
    useIonAlert
} from '@ionic/react';
import {pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import './Records.css';
import RecordCard from '../../components/Dossier/RecordCard';
import EditRecord from '../../components/Dossier/EditRecord';

const RecordDetails: React.FC = () => {
    interface ParamsInterface {
        id: string;
    }

    const params = useParams<ParamsInterface>();
    const [record, setRecord] = useState<ILawyercase>();
    const [isEdit, setIsEdit] = useState(false);
    const [present] = useIonAlert();
    const [selectedRecord, setSelectedRecord] = useState<ILawyercase>();

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
                setRecord(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [params.id, isEdit]);

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
                {record ?
                    <RecordCard record={record}/> :
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
        </IonPage>
    );
}

export default RecordDetails;