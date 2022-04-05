import { useEffect, useState } from "react";
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
import './AddClientToCase.css'
import {closeOutline, closeSharp} from 'ionicons/icons';
import ILawyercase from "../../types/lawyercase.type";
import LawyercaseDataService from "../../services/lawyercase.service";



interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    record: ILawyercase;
    recordClients: IClientData[];
}



const AddClientToCaseModal = (props: ModalProps) => {
    const {isOpen, setIsOpen, record, recordClients} = props;
    const [clients, setClients] = useState<IClientData[]>();
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const updateRecord = () => {
        console.log("Updating....")
        const newRecord: ILawyercase = {
            id: record.id,
            ref: record.ref,
            description: record.description,
            state: record.state,
            closed_at: record.closed_at || null,
            clients: record.clients
        }

        LawyercaseDataService.addClient(newRecord.id, selectedClient?.id)
            .then((res: any) => {
                console.log("Dossier mis à jour avec succès");
            })
            .catch((e: Error) => {
                console.log(e)
            })
            setIsOpen(false)
    }
    
    const handleAddClientToCase = () => {
        updateRecord();
        setIsOpen(false);        
    }

    useEffect(() => {
        retrieveClients();

    }, [setClients, isOpen])


    return(
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
                            if(!recordClients.includes(client)) {
                                return(
                                    <IonSelectOption value={client} key={index} >
                                        <IonLabel>{client.name + " " + client.firstname}</IonLabel>
                                    </IonSelectOption>
                                )
                            }else{
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