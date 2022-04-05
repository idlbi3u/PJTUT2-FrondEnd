import {
    InputChangeEventDetail,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useState} from "react";
import IEventData from "../../types/event.type";
import LawyercaseDataService from "../../services/lawyercase.service"
import {closeOutline, closeSharp} from "ionicons/icons";
import ILawyercase from "../../types/lawyercase.type";

interface ModalProps {
    record: ILawyercase,
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEvent = (props: ModalProps) => {
    const {isOpen, setIsOpen, record} = props;
    const [states, setStates] = useState<IEventData>({
        description: "",
        duration: ""
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveEvent = () => {
        const event: IEventData = {
            description: states.description,
            duration: states.duration,
        }
        LawyercaseDataService.addEventToLawyercase(record.id, event)

            .then((res: any) => {
                console.log(res);
            })
            .catch((e: Error) => {
                console.log(e)
            })
        setIsOpen(false)
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setIsOpen(false)}>
                            <IonIcon ios={closeOutline} md={closeSharp}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Ajouter un Évènement</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonItem>
                    <IonLabel position="floating">Évènement</IonLabel>
                    <IonInput type='text'
                              id='description'
                              required
                              name='description'
                              onIonChange={e => handleChange(e, "description")}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description du temps nécessaire :</IonLabel>

                    <IonInput type='text' id='duration' required name='duration'
                              onIonChange={e => handleChange(e, "duration")}/>

                </IonItem>

                <IonButton expand='block' type='submit' onClick={saveEvent}>
                    Ajouter
                </IonButton>

            </IonContent>
        </IonModal>
    )
}

export default AddEvent;

