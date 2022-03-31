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
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './AddClient.css'
import { useState } from 'react';
import { closeOutline, closeSharp } from 'ionicons/icons';
import IClientData from '../../types/client.type';
import ClientDataService from "../../services/client.service";


interface ModalProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddClient = (props: ModalProps) => {
    const { isOpen, setIsOpen } = props;
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [states, setStates] = useState<IClientData>({
        name:"",
        firstname:"",
        address:"",
        birthdate:""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates({...states, [e.target.name] : e.target.value.trim()})
    }

    const saveClient = () => {
        const client: IClientData = {
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: states.birthdate
        }

        ClientDataService.create(client)
            .then((res: any) => {
                console.log(res);
            })
            .catch((e: Error) => {
            console.log(e)
        })
    }

    return(
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}><IonIcon ios={closeOutline} md={closeSharp}/></IonButton>
                    </IonButtons>
                    <IonTitle>Ajouter un Client</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className='ion-padding'>
                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput type='text' id='name' required name='nom' onChange={() => handleChange} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prénom</IonLabel>
                        <IonInput type='text' id='firstname' required name='firstname' onChange={() => handleChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Adresse</IonLabel>
                        <IonInput type='text' id='name' required name='adresse' onChange={() => handleChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date De Naissance</IonLabel>
                        <IonDatetime  id='date' name='date' onChange={() => handleChange}/>
                    </IonItem>
                    <IonButton expand='block' type='submit' onChange={() => saveClient}>
                        Ajouter
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}

export default AddClient;