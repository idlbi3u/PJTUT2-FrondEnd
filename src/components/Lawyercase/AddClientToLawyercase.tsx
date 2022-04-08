import {useEffect, useState} from "react";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service"
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './AddClientToLawyercase.css'
import {closeOutline, closeSharp} from 'ionicons/icons';
import ILawyercase from "../../types/lawyercase.type";
import LawyercaseDataService from "../../services/lawyercase.service";
const isElectron = require('is-electron');


interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    lawyercase: ILawyercase;
    lawyercaseClients: IClientData[];
}


const AddClientToCaseModal = (props: ModalProps) => {
    const {isOpen, setIsOpen, lawyercase, lawyercaseClients} = props;
    const [clients, setClients] = useState<IClientData[]>();
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                if (isElectron()) {
                    setClients(response)
                } else {
                    setClients(response.data)
                }
            })
            .catch((e: Error) => {
            });
    }

    const updatelawyercase = () => {
        if (lawyercase.closed_at) {
            return
        }

        const newlawyercase: ILawyercase = {
            id: lawyercase.id,
            ref: lawyercase.ref,
            description: lawyercase.description,
            closed_at: lawyercase.closed_at || null,
            clients: lawyercase.clients
        }

        LawyercaseDataService.addClient(newlawyercase.id, selectedClient?.id)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
        setIsOpen(false)
    }

    const handleAddClientToCase = () => {
        updatelawyercase();
        setIsOpen(false);
    }

    useEffect(() => {
        retrieveClients();

        return () => {
        }

    }, [setClients, isOpen])


    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}><IonIcon ios={closeOutline}
                                                                             md={closeSharp}/></IonButton>
                    </IonButtons>
                    <IonTitle>Ajouter un Client dans ce Dossier</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Choisissez un Client</IonLabel>
                    <IonSelect onIonChange={(e) => {
                        setSelectedClient(e.detail.value)
                    }}>
                        {clients?.map((client: IClientData, index: number) => {
                            if (!lawyercaseClients.includes(client)) {
                                return (
                                    <IonSelectOption value={client} key={index}>
                                        <IonLabel>{client.name + " " + client.firstname}</IonLabel>
                                    </IonSelectOption>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </IonSelect>
                </IonItem>
                <IonButton expand='block' type='submit' onClick={handleAddClientToCase}>
                    Ajouter
                </IonButton>
            </IonContent>
        </IonModal>

    )
}

export default AddClientToCaseModal;