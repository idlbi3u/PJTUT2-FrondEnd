import { 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonIcon, 
    IonItem,     
    IonText,     
    IonTitle,
} from "@ionic/react";
import { 
    calendarClearOutline, 
    calendarClearSharp,    
    fileTrayFullOutline,
    fileTrayFullSharp,
    giftOutline,
    giftSharp,
    
    personOutline, 
    personSharp, 
    pinOutline, 
    pinSharp,  
    } from "ionicons/icons";
    
import {format, parseISO} from 'date-fns';


import IClientData from "../../types/client.type";
// CSS FILES
import './ClientCard.css';


interface ClientCardProps{
    client: IClientData;
}
const ClientCard = (props: ClientCardProps) => {
    const {client} = props;

    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

    return(
        <>
        {client ? (
            <>    
            <IonCard>
                <IonCardContent>
                    <IonIcon class="icon" ios={personOutline} md={personSharp}/> 

                    <IonItem lines="none">
                        <IonIcon ios={personOutline} md={personSharp}/>
                        <IonTitle>{client.name + ' ' + client.firstname}</IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        <IonIcon ios={calendarClearOutline} md={calendarClearSharp}/>
                        {client.createdAt ? (
                            <IonTitle>Client depuis le {formatDate(client.createdAt)}</IonTitle>

                        ) : null}
                    </IonItem>
                    <IonItem lines="none">
                        <IonIcon ios={giftOutline} md={giftSharp}/>
                        <IonTitle>{client.birthdate}</IonTitle>
                    </IonItem>

                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonIcon ios={pinOutline} md={pinSharp}/>
                        <IonTitle>Adresse</IonTitle>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        <h2>{client.address}</h2>
                    </IonText>
                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonIcon ios={fileTrayFullOutline} md={fileTrayFullSharp}/>
                        <IonTitle>Dossiers</IonTitle>
                    </IonItem>
                </IonCardHeader>
            </IonCard>
            </>
        ) : null}
            
        </>
    )
}

export default ClientCard;