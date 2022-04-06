import { IonCard, IonCardContent, IonItem, IonIcon, IonTitle, IonButton, IonCardHeader, IonText } from "@ionic/react"
import { ellipse, checkmarkCircle, checkmarkSharp, calendarClearOutline, calendarClearSharp, fileTrayFullOutline, fileTrayFullSharp } from "ionicons/icons"
import ILawyercase from "../../types/lawyercase.type"
import {format, parseISO} from 'date-fns';


interface CardProps{
    lawyercase: ILawyercase,
}
const LawyercaseDetailsCard = (props: CardProps) => {
    const {lawyercase} = props;

    const formatDate = (value?: string) => {
        if(value){
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };  

    return (
        <>        
            <IonCard>
                <IonCardContent>
                    <IonItem lines="none">
                            <IonIcon />
                            <IonTitle>{lawyercase.ref}</IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        <IonIcon color={lawyercase.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse} />
                        <IonTitle>{lawyercase.closed_at ? "Clôturé" : "En cours"}</IonTitle>
                        <IonButton  color={lawyercase.closed_at ? "danger" : "success"} disabled={!!lawyercase.closed_at}>Clôturer<IonIcon ios={checkmarkCircle} md={checkmarkSharp} /></IonButton>
                    </IonItem>
                    {lawyercase.createdAt ? (
                        <IonItem lines="none">
                                <IonIcon ios={calendarClearOutline} md={calendarClearSharp}/>
                                <IonTitle>{formatDate(lawyercase.createdAt)}</IonTitle>
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
                        <h2>{lawyercase.description}</h2>
                    </IonText>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default LawyercaseDetailsCard;