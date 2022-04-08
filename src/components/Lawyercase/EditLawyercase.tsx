import React, {useEffect, useState} from "react";
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
import {closeOutline, closeSharp} from "ionicons/icons";
import LawyercaseDataService from "../../services/lawyercase.service";
import ILawyercase from "../../types/lawyercase.type";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    lawyercase: ILawyercase
}


const EditLawyercase = (props: ModalProps) => {

    const {isOpen, lawyercase, setIsOpen} = props;

    const [states, setStates] = useState<ILawyercase>({
        id: lawyercase.id,
        ref: lawyercase.ref,
        description: lawyercase.description,
        closed_at : lawyercase.closed_at
    });    

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const updatelawyercase = () => {
        const newLawyercase: ILawyercase = {
            id: states.id,
            ref: states.ref,
            description: states.description,
            closed_at : states.closed_at || null
        }

        LawyercaseDataService.update(newLawyercase.id, newLawyercase)
            .then((res: any) => {
            })
            .catch((e: Error) => {
            })
            setIsOpen(false)
    }

    useEffect(() => {
        setStates(lawyercase);
        
    }, [lawyercase]);


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
                    <IonTitle>Editer un Dossier</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                    <IonItem>
                        <IonLabel  position="floating">Référence</IonLabel>
                        <IonInput  type='text'
                                  id='name'
                                  required
                                  name='ref'
                                  value={states.ref}
                                  onIonChange={e => handleChange(e, "ref")}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonInput type='text'
                                  id='name'
                                  required
                                  name='description'
                                  value={states.description}
                                  onIonChange={e => handleChange(e, "description")}/>
                    </IonItem>                    
                    <IonButton expand='block'
                               type='submit'
                               onClick={updatelawyercase}>
                        Mettre à jour
                    </IonButton>
            </IonContent>
        </IonModal>
    )
}


export default EditLawyercase;