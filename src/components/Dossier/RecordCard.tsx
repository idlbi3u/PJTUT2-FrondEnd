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
    fileTrayFullOutline,
    fileTrayFullSharp,
    
    personOutline, 
    personSharp, 
    pinOutline, 
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
                <IonItem lines="none">
                    <IonIcon class="icon" ios={personOutline} md={personSharp}/> 
                        <IonTitle>{record.ref}</IonTitle>
                        <IonTitle>{record.state ? "Clôturé" : "En cours"}</IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        {record.createdAt ? (
                            <IonLabel>Affaire ouverte le {formatDate(record.createdAt)}</IonLabel>
                        ) : null}
                    </IonItem>
                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonIcon ios={pinOutline} md={fileTrayFullSharp}/>
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
                        <IonIcon ios={fileTrayFullOutline} md={personSharp}/>
                        <IonTitle>Clients concernés</IonTitle>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        <h2>{record.clients}</h2>
                    </IonText>
                </IonCardContent>
            </IonCard>


            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonIcon ios={fileTrayFullOutline} md={personSharp}/>
                        <IonTitle>Évènements</IonTitle>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        <h2>{record.ref}</h2>
                    </IonText>
                </IonCardContent>
            </IonCard>
            <IonItem lines='none'>
                <IonButtons slot='start'>
                    <IonButton color='primary' onClick={() => {setIsOpen(true)}} >
                        <IonIcon icon={addOutline}></IonIcon>Ajouter un évènement
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonIcon ios={fileTrayFullOutline} md={personSharp}/>
                        <IonTitle>Total :</IonTitle>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        <h2>{record.ref}</h2>
                    </IonText>
                </IonCardContent>
            </IonCard>
            <AddEvent  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            </>
        ) : null}
            
        </>
    )
}

export default RecordCard;