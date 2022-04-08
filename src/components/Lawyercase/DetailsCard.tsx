import {
    IonCardContent,
    IonIcon,
    IonItem,
    IonText,
    IonTitle,    
} from "@ionic/react"
import {
    bookmarkOutline,
    bookmarkSharp,
    calendarClearOutline,
    calendarClearSharp,
    ellipse,    
} from "ionicons/icons"
import ILawyercase from "../../types/lawyercase.type"
import {format, parseISO} from 'date-fns';
import {useEffect} from "react";


interface CardProps {
    lawyercase: ILawyercase,
}

const DetailsCard = (props: CardProps) => {
    const {lawyercase} = props;

    
    const formatDate = (value: string) => {
        if (value) {
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    useEffect(() => {
        
    }, [lawyercase]);


    return (
        <IonCardContent>
            <IonItem lines="none">
                <IonIcon ios={bookmarkOutline} md={bookmarkSharp}/>
                <IonTitle>{lawyercase.ref}</IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonIcon color={lawyercase.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse}/>
                <IonTitle>{lawyercase.closed_at ? "Clôturé" : "En cours"}</IonTitle>                
            </IonItem>
            {lawyercase.createdAt ? (
                <IonItem lines="none">
                    <IonIcon ios={calendarClearOutline} md={calendarClearSharp}/>
                    <IonTitle>{formatDate(lawyercase.createdAt)}</IonTitle>
                </IonItem>
            ) : null}  
            <IonItem lines="none">
                <IonText>Description : {lawyercase.description}</IonText>
            </IonItem>    
            
        </IonCardContent>
    )
}

export default DetailsCard;