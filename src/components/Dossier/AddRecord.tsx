import { useState } from 'react';
import ILawyercase from '../../types/lawyercase.type';
import LawyercaseDataService from "../../services/lawyercase.service"
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/react';
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
        state:true,
        
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates({...states, [e.target.name] : e.target.value.trim()})
    }

    const saveRecord = () => {
        const record: ILawyercase = {
            ref: states.ref,
            description: states.description,
            state: states.state,
        }

        LawyercaseDataService.create(record)
            .then((res: any) => {
                console.log(res);
            })
            .catch((e: Error) => {
            console.log(e)
        })
    }

    const [selected, setSelected] = useState<string>();
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
                <form className='ion-padding'>
                    <IonItem>
                        <IonLabel position="floating">Référence</IonLabel>
                        <IonInput  type='text' id='ref' required name='ref' onChange={() => handleChange} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonInput type='text' id='description' required name='description' onChange={() => handleChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonRadioGroup name='Business' value={selected} onIonChange={e => setSelected(e.detail.value)}>
                            <IonItem>
                                <IonLabel>Affaire Cloturée</IonLabel>
                                <IonRadio slot="start" value="CompletedBusiness" />
                            </IonItem>   
                        </IonRadioGroup>
                    </IonItem>
                    <IonButton expand='block' type='submit' onChange={() => saveRecord}>
                        Ajouter
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}

export default AddRecord;

