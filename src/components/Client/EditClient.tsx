import React, {useEffect, useState} from "react";
import {
    DatetimeChangeEventDetail,
    InputChangeEventDetail,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {closeOutline, closeSharp} from "ionicons/icons";
import ClientDataService from "../../services/client.service";
import IClientData from "../../types/client.type";
import {format, parseISO} from 'date-fns';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    client: IClientData
}



const EditClient = (props: ModalProps) => {
    const {isOpen, client, setIsOpen} = props;    
    const [date, setDate] = useState<string>("");

    const [states, setStates] = useState<IClientData>({
        id: client.id,
        name: client.name,
        firstname: client.firstname,
        address: client.address,
        birthdate: client.birthdate,
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const handleChangeDate = (e: CustomEvent<DatetimeChangeEventDetail>) => {
        setDate(e.detail.value!);        
    }

    const updateClient = () => {
        const client: IClientData = {
            id: states.id,
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: date
        }

        ClientDataService.update(client.id, client)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
        setIsOpen(false);
    }

    const formatDate = (value: string) => {
        return format(parseISO(value), 'yyyy-MM-dd');
    };

    useEffect(() => {
        setStates(client);
        setDate(client.birthdate);
        
    }, [client.birthdate,client]);

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}>
                            <IonIcon ios={closeOutline}
                                     md={closeSharp}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Editer un Client</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput type='text'
                                  id='name'
                                  required
                                  name='nom'
                                  value={states.name}
                                  onIonChange={e => handleChange(e, "name")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prénom</IonLabel>
                        <IonInput type='text'
                                  id='firstname'
                                  required
                                  value={states.firstname}
                                  name='firstname'
                                  onIonChange={e => handleChange(e, "firstname")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Adresse</IonLabel>
                        <IonInput type='text'
                                  id='name'
                                  required
                                  name='address'
                                  value={states.address}
                                  onIonChange={e => handleChange(e, "address")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Date de naissance</IonLabel>
                        <IonInput type='text'
                                  id='bd'
                                  readonly={true}
                                  name='bd'
                                  value={states.birthdate}/>
                        </IonItem>

                    <IonItem>
                        <IonDatetime
                        size="cover"
                        id='date'
                        name='date'
                        presentation="date"
                        value={date}
                        onIonChange={handleChangeDate}

                        />
                    </IonItem>

                    <IonButton expand='block'
                               type='submit'
                               onClick={updateClient}>
                        Mettre à jour
                    </IonButton>
            </IonContent>
        </IonModal>
    )
}


export default EditClient;