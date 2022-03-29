import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddClient.css'
import { useState } from 'react';
import { closeOutline, closeSharp } from 'ionicons/icons';

interface ModalProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddClient = (props: ModalProps) => {
    const { isOpen, setIsOpen } = props;

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
                        <IonInput type='text' id='name' required name='nom' ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prénom</IonLabel>
                        <IonInput type='text' id='firstname' required name='firstname' ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Adresse</IonLabel>
                        <IonInput type='text' id='name' required name='adresse'></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date De Naissance</IonLabel>
                        <IonInput type='date' id='date' required name='date'></IonInput>
                    </IonItem>
                    <IonButton expand='block' type='submit'>
                        Ajouter
                    </IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}

export default AddClient;