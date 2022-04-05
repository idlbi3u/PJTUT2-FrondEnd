import { 
    IonButton,
    IonButtons,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonIcon, 
    IonItem,     
    IonLabel,     
    IonText,     
    IonTitle,
    useIonAlert,
} from "@ionic/react";
import {     
    addOutline,
    addSharp,
    alertOutline,
    alertSharp,
    calendarClearOutline,
    calendarClearSharp,
    ellipse,
    fileTrayFullOutline,
    fileTrayFullSharp,    
    fileTrayOutline,    
    personAddOutline,    
    personAddSharp,    
    personOutline, 
    personSharp, 
    timeOutline,
    timeSharp,
    trashBinOutline,
    trashBinSharp,    
    } from "ionicons/icons";
    
import {format, parseISO} from 'date-fns';


import ILawyercase from "../../types/lawyercase.type";
// CSS FILES
import './RecordCard.css';
import { useEffect, useState } from "react";
import AddEvent from "../Évènement/AddEvent";
import AddClientToCaseModal from "./AddClientToCase";
import lawyercaseService from "../../services/lawyercase.service";


interface RecordCardProps{
    record: ILawyercase;
}
const RecordCard = (props: RecordCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addClientModal, setAddClientModal] = useState(false)
    const [present] = useIonAlert();
    const {record} = props;


    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

    const handleDeleteClient = (clientId: string) => {
        lawyercaseService.removeClient(record.id, clientId)
    }
    
    return(
        <>
        {record ? (
            <>    
            <IonCard>
                <IonCardContent>
                    <IonIcon class="icon" ios={fileTrayOutline} md={fileTrayFullSharp}/> 
                    <IonItem lines="none">
                            <IonIcon />
                            <IonTitle>{record.ref}</IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        <IonIcon color={record.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse} />
                        <IonTitle>{record.closed_at ? "Clôturé" : "En cours"}</IonTitle>
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
                            <IonLabel>{client.name + ' ' + client.firstname}</IonLabel>
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
                    <IonItem lines='none'>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                    </IonText>
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
            <AddClientToCaseModal recordClients={record.clients ?? []} record={record} isOpen={addClientModal} setIsOpen={setAddClientModal}/>
            <AddEvent  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            </>
        ) : null}
            
        </>
    )
}

export default RecordCard;