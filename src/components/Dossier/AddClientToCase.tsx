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
}



const AddClientToCaseModal = (props: ModalProps) => {
    const {isOpen, setIsOpen, record} = props;
    const [clients, setClients] = useState<IClientData[]>();
    const [selectedClient, setSelectedClient] = useState<IClientData>();

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
                console.log(clients)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const updateRecord = () => {
        console.log("Updating....")
        if(selectedClient){
            const newRecord: ILawyercase = {
                id: record.id,
                ref: record.ref,
                description: record.description,
                state: record.state,
                closed_at : record.closed_at || null,
                clients: record.clients
            }
            console.log(record)
    
            LawyercaseDataService.update(newRecord.id, newRecord)
                .then((res: any) => {
                    console.log("Dossier mis à jour avec succès");
                })
                .catch((e: Error) => {
                    console.log(e)
                })
                setIsOpen(false)
        }else{
            console.log('erreur update')
        }
    }
    
    const handleAddClientToCase = () => {
        console.log(record.clients)
        if(record.clients && selectedClient && selectedClient.cases){
            record.clients.push(selectedClient!);
            selectedClient.cases.push(record);
            updateRecord();
            setIsOpen(false);
        }else{
            setIsOpen(false);
        }
    }

    useEffect(() => {
        retrieveClients();

    }, [])


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
                        console.log(e.detail.value);
                        setSelectedClient(e.detail.value)
                        }}>
                        {clients?.map((client: IClientData, index: number) => {
                            return(
                                <IonSelectOption value={client} key={index} >
                                    <IonLabel>{client.name + " " + client.firstname}</IonLabel>
                                </IonSelectOption>
                            )
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