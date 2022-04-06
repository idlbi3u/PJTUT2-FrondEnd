import { 
    IonButton,
    IonButtons,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCol, 
    IonGrid, 
    IonIcon, 
    IonItem,
    IonRow,
    IonTitle

} from "@ionic/react";
import IEventData from "../../types/event.type"
import {format, parseISO} from 'date-fns';
import { 
    addOutline,
    addSharp,
    alertOutline, 
    alertSharp 
} from "ionicons/icons";
import AddEvent from "../Évènement/AddEvent";
import { useState } from "react";
import ILawyercase from "../../types/lawyercase.type";



interface EventsCardProps{
    lawyercase: ILawyercase;
}

const EventsCard = (props: EventsCardProps) => {
    const {lawyercase} = props;
    const [isOpen, setIsOpen] = useState(false);


    const formatDate = (value?: string) => {
        if(value){
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    return (
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
                    {lawyercase.events?.map((event: IEventData, index: number) => {
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
            <AddEvent lawyercase={lawyercase}  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
        </IonCard>
    )
}

export default EventsCard;