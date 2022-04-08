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
} from '@ionic/react';
import './AddClient.css'
import {useState} from 'react';
import {closeOutline, closeSharp} from 'ionicons/icons';
import IClientData from '../../types/client.type';
import ClientDataService from "../../services/client.service";
import {format, parseISO} from 'date-fns';


interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddClient = (props: ModalProps) => {
    const {isOpen, setIsOpen} = props;
    const [date, setDate] = useState("");
    const [states, setStates] = useState<IClientData>({
        id:"",
        name: "",
        firstname: "",
        address: "",
        birthdate: "",
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveClient = () => {
        const client: IClientData = {
            id: states.id,
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: date
        }

        ClientDataService.create(client)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
        setIsOpen(false);
    }

    const formatDate = (value: string) => {
        return format(parseISO(value), 'yyyy-MM-dd');
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}><IonIcon ios={closeOutline}
                                                                             md={closeSharp}/></IonButton>
                    </IonButtons>
                    <IonTitle>Ajouter un Client</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Nom</IonLabel>
                    <IonInput type='text' id='name' required name='nom' onIonChange={e => handleChange(e, "name")}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prénom</IonLabel>
                    <IonInput type='text' id='firstname' required name='firstname'
                              onIonChange={e => handleChange(e, "firstname")}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Adresse</IonLabel>
                    <IonInput type='text' id='adress' required name='address'
                              onIonChange={e => handleChange(e, "address")}/>
                </IonItem>
                <IonItem lines='none'>
                    <IonLabel>Date de naissance</IonLabel>
                </IonItem>
                <IonItem>
                    <IonDatetime
                        size='cover'
                        id='date'
                        name='date'
                        presentation="date"
                        onIonChange={ev => setDate(formatDate(ev.detail.value!))}
                    />
                </IonItem>
                <IonButton expand='block' type='submit' onClick={saveClient}>
                    Ajouter
                </IonButton>
            </IonContent>
        </IonModal>
    )
}

export default AddClient;