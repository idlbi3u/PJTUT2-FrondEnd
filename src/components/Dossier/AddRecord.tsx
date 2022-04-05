import { useState } from 'react';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline, closeSharp } from 'ionicons/icons';



interface ModalProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRecord = (props: ModalProps) => {
    const { isOpen, setIsOpen } = props;
    const [states, setStates] = useState<ILawyercase>({
        ref:"",
        description:"",
        state:false,
        closed_at:null
        
    });

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const saveRecord = () => {
        const record: ILawyercase = {
            ref: states.ref,
            description: states.description,
            state: states.state,
            closed_at: states.closed_at
        }
        LawyercaseDataService.create(record)
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
                    <IonTitle>Ajouter un Dossier</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
    
                    <IonItem>
                        <IonLabel position="floating">Référence</IonLabel>
                        <IonInput  type='text' id='ref' required name='ref' onIonChange={e => handleChange(e, "ref")} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonInput type='text' id='description' required name='description'  onIonChange={e => handleChange(e, "description")}></IonInput>
                    </IonItem>
                    <IonButton expand='block' type='submit' onClick={saveRecord}>
                        Ajouter
                    </IonButton>
                
            </IonContent>
        </IonModal>
    )
}

export default AddRecord;

