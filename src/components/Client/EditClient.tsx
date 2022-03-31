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
import {format, parseISO} from 'date-fns';
import ClientDataService from "../../services/client.service";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    client: IClient
}

interface IClient {
    id?: string,
    name: string,
    firstname: string,
    address: string,
    birthdate: string
}

const EditClient = (props: ModalProps) => {

    const {isOpen, client, setIsOpen} = props;
    const [date, setDate] = useState("");

    const [states, setStates] = useState<IClient>({
        id: client.id,
        name: client.name,
        firstname: client.firstname,
        address: client.address,
        birthdate: client.birthdate,
    });

    const formatDate = (value: string) => {
        return format(parseISO(value), 'yyyy-MM-dd');
    };

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const updateClient = () => {
        console.log("Updating....")
        const client: IClient = {
            id: states.id,
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: date
        }

        ClientDataService.update(client.id, client)
            .then((res: any) => {
                console.log("Client mis à jour avec succès");
            })
            .catch((e: Error) => {
                console.log(e)
            })
        setIsOpen(false);
        // window.location.reload();
    }


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
                                  disabled
                                  name='bd'
                                  value={states.birthdate}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Sélectionnez <br/> Date De Naissance</IonLabel>
                        {/*TODO : Le format de la date dans la value={} ne fonctionne pas*/}
                        <IonDatetime id='date'
                                     name='date'
                                     presentation="date"
                                     onIonChange={ev => setDate(formatDate(ev.detail.value!))}/>
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