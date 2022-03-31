import React, {useState} from "react";
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
    IonRadio,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {closeOutline, closeSharp} from "ionicons/icons";
import LawyercaseDataService from "../../services/lawyercase.service";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    record: IRecord
}

interface IRecord {
    id?: any|null,
    ref: string,
    description: string,
    state: boolean,
}

const EditRecord = (props: ModalProps) => {

    const {isOpen, record, setIsOpen} = props;

    const [states, setStates] = useState<IRecord>({
        id: record.id,
        ref: record.ref,
        description: record.description,
        state: record.state,
    });

    console.log(states)

    

    const handleChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
        setStates({...states, [inputName]: e.detail.value});
    }

    const updateRecord = () => {
        console.log("Updating....")
        const record: IRecord = {
            id: states.id,
            ref: states.ref,
            description: states.description,
            state: states.state,
        }

        LawyercaseDataService.update(record.id, record)
            .then((res: any) => {
                console.log("Dossier mis à jour avec succès");
            })
            .catch((e: Error) => {
                console.log(e)
            })
        /*setIsOpen(false);*/
        /*window.location.reload();*/
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
                    <IonTitle>Editer un Dossier</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className='ion-padding'>
                    <IonItem>
                        <IonLabel  position="floating">Référence</IonLabel>
                        <IonInput  disabled type='text'
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
                    <IonItem>
                        <IonLabel position="floating">Affaire Cloturée</IonLabel>
                        <IonRadio slot="start" 
                                  id='bd'
                                  disabled
                                  name='bd'
                                  value={states.state}/>
                    </IonItem>
                    <IonButton expand='block'
                               type='submit'
                               onClick={updateRecord}>
                        Mettre à jour
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}


export default EditRecord;