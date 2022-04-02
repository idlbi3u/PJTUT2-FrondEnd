import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import IEventData from "../../types/event.type";
import LawyercaseDataService from "../../services/lawyercase.service"
import { closeOutline, closeSharp } from "ionicons/icons";

interface ModalProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEvent = (props: ModalProps) => {
    const { isOpen, setIsOpen } = props;
    const [states, setStates] = useState<IEventData>({
        description:"",
        minutes:"",
        hours:""
        
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveEvent = () => {
        const event: IEventData = {
            description: states.description,
            minutes: states.minutes,
            hours: states.hours
        }
        console.log(event)
        LawyercaseDataService.create(event)
            .then((res: any) => {
                console.log(res);
            })
            .catch((e: Error) => {
            console.log(e)
        })
        setIsOpen(false)
    }

    return(
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
                        <IonInput  type='text' id='description' required name='description' onIonChange={e => handleChange(e, "description")} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Temps en heures et minutes</IonLabel>
                        
                        <IonInput type='text' id='description' required name='description'  onIonChange={e => handleChange(e, "hours")}></IonInput>
                        <IonInput type='text' id='description' required name='description'  onIonChange={e => handleChange(e, "minutes")}></IonInput>
                    </IonItem>
                  
                    <IonButton expand='block' type='submit' onClick={saveEvent}>
                        Ajouter
                    </IonButton>
                
            </IonContent>
        </IonModal>
    )
}

export default AddEvent;

