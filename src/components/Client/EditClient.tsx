import React, {useState} from "react";
import {
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
import IClientData from "../../types/client.type";
import {format, parseISO} from 'date-fns';
import ClientDataService from "../../services/client.service";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    client: IClientData | undefined
}

const EditClient = (props: ModalProps) => {

    const {isOpen, client, setIsOpen} = props;
    const [date, setDate] = useState("");
    const [states, setStates] = useState<IClientData>({
        name: "",
        firstname: "",
        address: "",
        birthdate: ""
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveClient = () => {
        const client: IClientData = {
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: date
        }
        console.log(client);

        ClientDataService.update(client.id, client)
            .then((res: any) => {
                console.log("Client mis à jour avec succès");
            })
            .catch((e: Error) => {
                console.log(e)
            })
        setIsOpen(false);
        window.location.reload();
    }


    const formatDate = (value: string) => {
        return format(parseISO(value), 'yyyy-MM-dd');
    };
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
                <form className='ion-padding'>
                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput type='text' id='name' required name='nom' value={client?.name}
                                  onIonChange={e => handleChange(e, "name")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prénom</IonLabel>
                        <IonInput type='text' id='firstname' required value={client?.firstname} name='firstname'
                                  onIonChange={e => handleChange(e, "firstname")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Adresse</IonLabel>
                        <IonInput type='text' id='name' required name='address' value={client?.address}
                                  onIonChange={e => handleChange(e, "address")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date De Naissance</IonLabel>
                        <IonDatetime id='date' name='date' value={client?.birthdate}
                                     onIonChange={ev => setDate(formatDate(ev.detail.value!))}/>
                    </IonItem>
                    <IonButton expand='block' type='submit' onChange={() => saveClient}>
                        Mettre à jour
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}


export default EditClient;