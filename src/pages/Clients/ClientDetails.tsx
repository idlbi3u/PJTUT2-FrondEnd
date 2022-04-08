import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonRouterLink,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert
} from "@ionic/react";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service"
import './ClientDetails.css';
import {
    arrowBackOutline,
    arrowBackSharp,
    calendarClearOutline,
    calendarClearSharp,
    fileTrayFullOutline,
    fileTrayFullSharp,
    giftOutline,
    giftSharp,
    pencilOutline,
    pencilSharp,
    personOutline,
    personSharp,
    pinOutline,
    pinSharp,
    trashBinOutline,
    trashBinSharp,
    warning
} from "ionicons/icons";
import EditClient from "../../components/Client/EditClient";
import ILawyercase from "../../types/lawyercase.type";
import {format, parseISO} from 'date-fns';

const isElectron = require('is-electron');


interface ParamsInterface {
    id: string;
}

const ClientDetails = () => {
    const params = useParams<ParamsInterface>();
    const [client, setClient] = useState<IClientData>();
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [present] = useIonAlert();
    const [selectedClient, setSelectedClient] = useState<IClientData>();


    const deleteClient = (id: string) => {
        ClientDataService.delete(id)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
        setDelete(false);
    }

    const handleDeleteClient = (id: string) => {
        setDelete(true);
        deleteClient(id);
    }

    const handleModifyClient = (client: any) => {
        setSelectedClient(client)
        setIsEdit(true)
    }
    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

    const getClient = useCallback(
        () => {
            ClientDataService.get(params.id)
            .then((response: any) => {
                if (isElectron()) {
                    setClient(response);
                } else {
                    setClient(response.data);
                }
            })
            .catch((e: Error) => {
            });
        },
        [params.id],
    )

    useEffect(() => {
        getClient();

        return () => {
        }
    }, [params.id, isEdit, Delete, getClient]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonButton routerLink="/clients" routerDirection="back"><IonIcon ios={arrowBackOutline}
                                                                  md={arrowBackSharp}/></IonButton>
                    </IonButtons>

                    <IonTitle>Clients {' > ' + client?.name + ' ' + client?.firstname} </IonTitle>
                </IonToolbar>
                <IonItem lines="none">
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            slot="start"
                            onClick={() => {
                                handleModifyClient(client)
                            }}

                        >Modifier Client<IonIcon ios={pencilOutline} md={pencilSharp}/></IonButton>
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
                                        {text: 'Confirmer', handler: () => handleDeleteClient(client?.id)}
                                    ],
                                })

                            }}

                        >Supprimer<IonIcon ios={trashBinOutline} md={trashBinSharp}/></IonButton>
                    </IonButtons>
                </IonItem>
            </IonHeader>
            <IonContent>
                {client ?
                    <>
                        <IonCard>
                            <IonCardHeader>
                                <IonItem lines="none">
                                    <IonIcon ios={personOutline} md={personSharp}/>
                                    <IonTitle>Informations Client</IonTitle>
                                </IonItem>
                            </IonCardHeader>
                            <IonCardContent>                                
                                <IonItem lines="none">
                                    <IonIcon ios={personOutline} md={personSharp}/>
                                    <IonTitle>{client.name + ' ' + client.firstname}</IonTitle>
                                </IonItem>
                                {client.createdAt ? (
                                    <IonItem lines="none">
                                        <IonIcon ios={calendarClearOutline} md={calendarClearSharp}/>
                                        <IonTitle>Client depuis le {formatDate(client.createdAt)}</IonTitle>
                                    </IonItem>
                                ) : null}
                                {client.birthdate ? (
                                    <IonItem lines="none">
                                        <IonIcon ios={giftOutline} md={giftSharp}/>
                                        <IonTitle>{client.birthdate}</IonTitle>
                                    </IonItem>
                                ) : null}
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

                            <IonCardContent>
                                {client.lawyercases?.length !== 0 ?
                                    client.lawyercases?.map((lawyercase: ILawyercase, index: number) => (
                                        <IonItem lines="none" key={index}>
                                            <IonText>
                                                <IonRouterLink className="link"
                                                               routerLink={'/lawyercases/view/' + client.id}>
                                                    {lawyercase.ref}
                                                </IonRouterLink>
                                            </IonText>
                                        </IonItem>
                                    )) : (
                                        <>
                                            <IonIcon ios={warning} md={warning}/>
                                            <IonText> Aucun dossier associé</IonText>
                                        </>
                                    )}


                            </IonCardContent>
                        </IonCard>
                    </>


                    :
                    <IonItem>
                        <IonText color="danger">Ce client n'existe pas!</IonText>
                    </IonItem>
                }
            </IonContent>

            {selectedClient ? (
                <EditClient
                    client={selectedClient}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}
        </IonPage>
    );
}

export default ClientDetails;