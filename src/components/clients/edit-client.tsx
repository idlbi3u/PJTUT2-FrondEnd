import React, {useState} from "react";
import {
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
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    client: IClientData | undefined
}

const EditClient = (props: ModalProps) => {

    const {isOpen, client, setIsOpen} = props;
    const [states, setStates] = useState<IClientData>({
        name: "",
        firstname: "",
        address: "",
        birthdate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates({...states, [e.target.name]: e.target.value.trim()})

        console.log(states.name)
        console.log(states.firstname)
        console.log(states.address)
        console.log(states.birthdate)
    }


    const updateClient = () => {
        const client: IClientData = {
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: states.birthdate
        }

        ClientDataService.update(client.id, client)
            .then((res: any) => {
                console.log(res);
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}><IonIcon ios={closeOutline}
                                                                             md={closeSharp}/></IonButton>
                    </IonButtons>
                    <IonTitle>Editer un client</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className='ion-padding'>
                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput type='text' id='name' required name='nom' value={client?.name}
                                  onChange={() => handleChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prénom</IonLabel>
                        <IonInput type='text' id='firstname' required value={client?.firstname} name='firstname'
                                  onChange={() => handleChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Adresse</IonLabel>
                        <IonInput type='text' id='name' required name='adresse' value={client?.address}
                                  onChange={() => handleChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date De Naissance</IonLabel>
                        <IonDatetime id='date' name='date' value={client?.birthdate} onChange={() => handleChange}/>
                    </IonItem>
                    <IonButton expand='block' type='submit' onClick={() => updateClient}>
                        Mettre à jour
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}

export default EditClient;