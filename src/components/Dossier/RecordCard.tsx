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
    } from "ionicons/icons";
    
import {format, parseISO} from 'date-fns';


import ILawyercase from "../../types/lawyercase.type";
// CSS FILES
import './RecordCard.css';
import { useState } from "react";
import AddEvent from "../Évènement/AddEvent";


interface RecordCardProps{
    record: ILawyercase;
}
const RecordCard = (props: RecordCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {record} = props;

    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

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
                        <IonIcon color={record.state ? "danger" : "success"} ios={ellipse} md={ellipse} />
                        <IonTitle>{record.state ? "Clôturé" : "En cours"}</IonTitle>
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
                            <IonButton color='primary' onClick={() => {setIsOpen(true)}} >
                                <IonIcon color="primary" ios={personAddOutline} md={personAddSharp} />
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    {record.clients?.map((client, index) => (
                        <IonItem lines="none" key={index}>                            
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
            <AddEvent  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            </>
        ) : null}
            
        </>
    )
}

export default RecordCard;