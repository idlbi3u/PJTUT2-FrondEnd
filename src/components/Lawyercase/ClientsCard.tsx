import {
    IonButton,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonRouterLink,
    useIonAlert
} from "@ionic/react";
import {    
    trashBinOutline,
    trashBinSharp
} from "ionicons/icons";
import {useEffect} from "react";
import LawyercaseDataService from "../../services/lawyercase.service";
import IClientData from "../../types/client.type";
import './ClientsCard.css'

interface CardProps {
    lawyercaseClients: IClientData[],
    lawyercaseId: string,
    lawyercaseState: boolean
}

const ClientsCard = (props: CardProps) => {
    const {lawyercaseClients, lawyercaseId, lawyercaseState} = props;
    const [present] = useIonAlert();



    const handleDeleteClient = (clientId: string) => {
        LawyercaseDataService.removeClient(lawyercaseId, clientId)
            .then(() => {
                LawyercaseDataService.get(lawyercaseId).then((res: any) => {     
        
            }).catch((e: Error) => {
                console.log(e);
            })
        })
    }

    useEffect(() => {   

        return () => {
            console.log('unmounting client card component');
        };

    }, []);
    


    return (
        <IonCardContent>
            {lawyercaseClients.map((client: IClientData, index: number) => (
                <IonItem lines="none" key={index}>
                    {lawyercaseState ? (
                        <IonItem lines="none">
                            <IonButton color="danger" onClick={() => {
                                present({
                                    cssClass: 'my-css',
                                    header: 'Suppression d\'un client',
                                    message: 'êtes-vous sûr de vouloir supprimer ce client ?',
                                    buttons: [
                                        {text: 'Annuler', role: 'cancel'},
                                        {text: 'Confirmer', handler: () => handleDeleteClient(client.id)}
                                    ],
                                    onDidDismiss: (e) => console.log('did dismiss'),
                                })
                            }}>
                                <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                            </IonButton>
                        </IonItem>
                    ) : null}
                    <IonLabel>
                        <IonRouterLink class='link' routerLink={'/clients/view/' + client.id}>
                            {client.name + ' ' + client.firstname}
                        </IonRouterLink>
                    </IonLabel>
                </IonItem>
            ))}
        </IonCardContent>
    )
}

export default ClientsCard;