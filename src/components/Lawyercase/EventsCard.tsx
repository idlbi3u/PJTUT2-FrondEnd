import {   
    IonCardContent,
    IonCol,
    IonGrid,
    IonRow,    
} from "@ionic/react";
import IEventData from "../../types/event.type"
import {format, parseISO} from 'date-fns';
import {useEffect} from "react";


interface ILawyercaseEvents {
    lawyercaseEvents: IEventData[];
}

const EventsCard = (props: ILawyercaseEvents) => {
    const {lawyercaseEvents} = props;

    const formatDate = (value?: string) => {
        if (value) {
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    useEffect(() => {       

        return () => {
        };

    }, []);


    return (
        <IonCardContent>
            <IonGrid>
                {lawyercaseEvents.map((event: IEventData, index: number) => {
                    return (
                        <IonRow key={index}>
                            <IonCol>{formatDate(event.createdAt)}</IonCol>
                            <IonCol>{event.duration} minutes</IonCol>
                            <IonCol>{event.description}</IonCol>
                        </IonRow>
                    )
                })}
            </IonGrid>
        </IonCardContent>
    )
}

export default EventsCard;