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
    lawyercaseState: boolean,
    setIsDeleted: (isDeleted: boolean) => void,
}

const ClientsCard = (props: CardProps) => {
    const {lawyercaseClients, lawyercaseId, lawyercaseState, setIsDeleted} = props;
    const [present] = useIonAlert();



    const handleDeleteClient = (clientId: string) => {
        setIsDeleted(false);
        LawyercaseDataService.removeClient(lawyercaseId, clientId)
            .then(() => {
                LawyercaseDataService.get(lawyercaseId).then((res: any) => {     
        
            }).catch((e: Error) => {
            })
        })
    }

    useEffect(() => {   

        return () => {
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
                                    onDidDismiss: (e) => {setIsDeleted(false)},
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