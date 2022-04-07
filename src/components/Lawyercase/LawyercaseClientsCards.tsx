import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonTitle,
    useIonAlert
} from "@ionic/react";
import {
    personAddOutline,
    personAddSharp,
    personOutline,
    personSharp,
    trashBinOutline,
    trashBinSharp
} from "ionicons/icons";
import {useEffect, useState} from "react";
import lawyercaseService from "../../services/lawyercase.service";
import LawyercaseDataService from "../../services/lawyercase.service";
import ILawyercase from "../../types/lawyercase.type";
import AddClientToCaseModal from "./AddClientToLawyercase";
import './LawyercaseClientsCards.css';

interface CardProps {
    lawyercase: ILawyercase,
}


const LawyercaseClientsCard = (props: CardProps) => {
    const {lawyercase} = props;
    const [present] = useIonAlert();
    const [addClientModal, setAddClientModal] = useState(false)
    const [lawyerCaseState, setLawyerCaseState] = useState<ILawyercase>(lawyercase);
    const [lawyerCaseClients, setLawyerCaseClients] = useState(lawyercase.clients);


    const handleDeleteClient = (clientId: string) => {
        lawyercaseService.removeClient(lawyercase?.id, clientId)
    }

    useEffect(() => {
        LawyercaseDataService.get(lawyercase.id).then((res: any) => {
            setLawyerCaseState(res.data);
            setLawyerCaseClients(res.data.clients);
        });
        return () => {
            console.log("unmounting");
        };

    }, [addClientModal, lawyercase.id]);

    return (
        <IonCard>
            <IonCardHeader>
                <IonItem lines="none">
                    <IonIcon ios={personOutline} md={personSharp}/>
                    <IonTitle>Clients concernés</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton disabled={!!lawyercase.closed_at} color='primary' onClick={() => {
                            setAddClientModal(true)
                        }}>
                            <IonIcon color="primary" ios={personAddOutline} md={personAddSharp}/>
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonCardHeader>

            <IonCardContent>
                {lawyerCaseClients?.map((client, index) => (
                    <IonItem lines="none" key={index}>
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
                                })
                            }}>
                                <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                            </IonButton>
                        </IonItem>
                        <IonLabel>
                            <IonRouterLink class='link' routerLink={'/clients/view/' + client.id}>
                                {client.name + ' ' + client.firstname}
                            </IonRouterLink>
                        </IonLabel>
                    </IonItem>
                ))}
            </IonCardContent>
            <AddClientToCaseModal lawyercaseClients={lawyercase.clients ?? []} lawyercase={lawyercase}
                                  isOpen={addClientModal} setIsOpen={setAddClientModal}/>
        </IonCard>
    )
}

export default LawyercaseClientsCard;