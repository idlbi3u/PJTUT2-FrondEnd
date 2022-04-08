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
    lawyercase: ILawyercase,
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getLawyercase: () => void;
}

const AddEvent = (props: ModalProps) => {
    const {isOpen, setIsOpen, lawyercase, getLawyercase} = props;
    const [states, setStates] = useState<IEventData>({
        description: "",
        duration: 0,
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveEvent = () => {
        
        if (lawyercase.closed_at) {
            setIsOpen(false);
            return;
        }

        const event: IEventData = {
            description: states.description,
            duration: states.duration,
        }
        LawyercaseDataService.addEventToLawyercase(lawyercase?.id, event)

            .then((res: any) => {
            })
            .catch((e: Error) => {
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

                    <IonInput type='number' id='duration' required name='duration'
                              onIonChange={e => handleChange(e, "duration")}/>

                </IonItem>

                <IonButton expand='block' onClick={saveEvent}>
                    Ajouter
                </IonButton>

            </IonContent>
        </IonModal>
    )
}

export default AddEvent;

