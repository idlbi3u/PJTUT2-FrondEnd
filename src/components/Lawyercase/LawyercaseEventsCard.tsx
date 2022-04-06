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
import {addOutline, addSharp, alertOutline, alertSharp} from "ionicons/icons";
import AddEvent from "../Events/AddEvent";
import {useEffect, useState} from "react";
import ILawyercase from "../../types/lawyercase.type"


interface ILawyercaseEvents {
    lawyercase?: ILawyercase
}

const EventsCard = ({lawyercase}: ILawyercaseEvents) => {

    const [isOpen, setIsOpen] = useState(false);
    const [lawyerCaseEvent, setLawyerCaseEvent] = useState<ILawyercase>();

    const formatDate = (value?: string) => {
        if (value) {
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    useEffect(() => {
        console.log(lawyercase)
        setLawyerCaseEvent(lawyercase)
    }, [isOpen, lawyercase]);


    return (
        <IonCard>
            <IonCardHeader>
                <IonItem lines="none">
                    <IonIcon ios={alertOutline} md={alertSharp}/>
                    <IonTitle>Évènements</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton color='primary' onClick={() => {
                            setIsOpen(true)
                        }}>
                            <IonIcon color="primary" ios={addOutline} md={addSharp}/>
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    {lawyerCaseEvent?.events?.map((event: IEventData, index: number) => {
                        return (
                            <IonRow key={index}>
                                <IonCol>{formatDate(event.createdAt)}</IonCol>
                                <IonCol>{event.duration}</IonCol>
                                <IonCol>{event.description}</IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonCardContent>
            <AddEvent lawyercase={lawyercase} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
        </IonCard>
    )
}

export default EventsCard;