import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonItem,
    IonText,
    IonTitle,
    useIonAlert
} from "@ionic/react"
import {
    calendarClearOutline,
    calendarClearSharp,
    checkmarkCircle,
    checkmarkSharp,
    ellipse,
    fileTrayFullOutline,
    fileTrayFullSharp
} from "ionicons/icons"
import ILawyercase from "../../types/lawyercase.type"
import {format, parseISO} from 'date-fns';
import LawyercaseDataService from "../../services/lawyercase.service"
import {useState} from "react";


interface CardProps {
    lawyercase: ILawyercase,
}

const LawyercaseDetailsCard = (props: CardProps) => {
    const {lawyercase} = props;
    const [present] = useIonAlert();

    const [lawyerCaseState, setLawyerCaseState] = useState<ILawyercase>(lawyercase);

    const formatDate = (value: string) => {
        if (value) {
            return format(parseISO(value), 'dd/MM/yyyy');
        }
    };

    const handleChangeStatus = (lawyercase: ILawyercase) => {
        if (lawyercase.closed_at === null) {
            lawyercase.closed_at = formatDate(new Date().toISOString());
            setLawyerCaseState(lawyercase);
            LawyercaseDataService.updateStatus(lawyercase.id, lawyercase)
                .then(() => {
                    console.log('updated')
                })
                .catch((e: Error) => {
                    console.log(e)
                })
        }
    }

    return (
        <>
            <IonCard>
                <IonCardContent>
                    <IonItem lines="none">
                        <IonIcon/>
                        <IonTitle>{lawyercase.ref}</IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        <IonIcon color={lawyercase.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse}/>
                        <IonTitle>{lawyercase.closed_at ? "Clôturé" : "En cours"}</IonTitle>
                        <IonButton color={lawyercase.closed_at ? "danger" : "success"}
                                   disabled={!!lawyercase.closed_at}
                                   onClick={() => {
                                       present({
                                           cssClass: 'my-css',
                                           header: 'Suppression d\'un Dossier',
                                           message: 'êtes-vous sûr de vouloir clôturer ce Dossier ?',
                                           buttons: [
                                               {text: 'Annuler', role: 'cancel'},
                                               {text: 'Confirmer', handler: () => handleChangeStatus(lawyercase)}
                                           ],
                                       })
                                   }}
                        >Clôturer
                            <IonIcon ios={checkmarkCircle}
                                     md={checkmarkSharp}/></IonButton>
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