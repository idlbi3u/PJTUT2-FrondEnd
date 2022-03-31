import { 
    IonButton, 
    IonButtons, 
    IonCard, 
    IonCardContent, 
    IonIcon, 
    IonItem,     
    IonTitle,
    useIonAlert} from "@ionic/react";
import { 
    calendarClearOutline, 
    calendarClearSharp,
    pencilOutline, 
    pencilSharp, 
    personOutline, 
    personSharp, 
    trashBinOutline, 
    trashBinSharp} from "ionicons/icons";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service";
import {format, parseISO} from 'date-fns';
import './ClientCard.css';
import { useState } from "react";
import EditClient from "./EditClient";


interface ClientCardProps{
    client: IClientData;
}
const ClientCard = (props: ClientCardProps) => {
    const {client} = props;
    const [present] = useIonAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const formatDate = (value: string) => {
        return format(parseISO(value), 'yyyy-MM-dd');
    };
    const handleDeleteClient = (id: string) => {
        deleteClient(id);
    }
    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    const handleModifyClient = (client: any) => {        
        setSelectedClient(client)
        setIsEdit(true)
    }
    
    return(
        <>
        {client ? (
            <>
                <IonItem  lines="none">
                    <IonButtons slot="end">
                        <IonButton 
                        color="primary" 
                        slot="start"
                        onClick={() => {
                            handleModifyClient(client)
                        }}
                        
                        >Modifier<IonIcon ios={pencilOutline} md={pencilSharp}/></IonButton>
                        <IonButton 
                        color="danger" 
                        slot="end"
                        onClick={() => {
                            present({
                                cssClass: 'my-css',
                                header: 'Suppression d\'un Client',
                                message: 'êtes-vous sûr de vouloir supprimer ce Client ?',
                                buttons: [
                                  {text: 'Annuler', role: 'cancel'},
                                  { text: 'Confirmer', handler: () => handleDeleteClient(client.id)}
                                ],                        
                              })
                        }}
                        
                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>

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
                            <IonTitle>{formatDate(client.createdAt)}</IonTitle>

                        ) : null}
                    </IonItem>

                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardContent>
                    
                </IonCardContent>
            </IonCard>
                {selectedClient ? (
                    <EditClient
                        client={selectedClient}
                        isOpen={isEdit}
                        setIsOpen={() => setIsEdit(false)}
                    />
                ) : null}
            </>
        ) : null}
            
        </>
    )
}

export default ClientCard;