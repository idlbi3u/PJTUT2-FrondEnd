import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {addOutline, pencil, trash,} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Records.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';
import AddRecord from '../../components/Dossier/AddRecord'
import IClientData from '../../types/client.type';


const Records: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [filter, setFilter] = useState<string>("AllBusiness");

    const handleDeleteRecord = (id: number) => {

    }

    const handleModifyRecord = (id: string) => {
        deleteRecord(id);
    }

    const [records, setRecords] = useState<ILawyercase[]>([]);

    const retrieveRecords = () => {
        LawyercaseDataService.getAll()
            .then((response: any) => {
                setRecords(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteRecord = (id: string) => {
        LawyercaseDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    useEffect(() => {
        retrieveRecords();

    }, []);

    const [filteredRecords, setFilteredRecords] = useState<ILawyercase[]>(records);

    useEffect(() => {
        if (filter === "AllBusiness") {
            setFilteredRecords(records);
        } else if (filter === "OnGoingBusiness") {
            setFilteredRecords(records.filter(record => !record.state));
        } else {
            setFilteredRecords(records.filter(record => record.state));
        }
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none' slot='start'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home'/>
                        </IonButtons>
                    </IonItem>
                    <IonItem>
                        <IonTitle>Dossiers</IonTitle>
                        <IonItem className='Business' lines='none'>
                            <IonSelect placeholder="Selectionnez une catégorie d'affaire" value={filter}
                                       onIonChange={e => setFilter(e.detail.value)}>
                                <IonSelectOption value="AllBusiness">Toutes les affaires</IonSelectOption>
                                <IonSelectOption value="OnGoingBusiness">Affaires en cours</IonSelectOption>
                                <IonSelectOption value="CompletedBusiness">Affaires cloturées</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='SearchBar' lines='none'>
                            <IonSearchbar class='search-bar' type='text' animated={true}></IonSearchbar>
                        </IonItem>
                    </IonItem>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => {
                            setIsOpen(true)
                        }}>
                            <IonIcon icon={addOutline}/>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>
                <IonGrid>
                    <IonRow className='Row'>
                        <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions</IonCol>
                    </IonRow>
                    {filteredRecords.map((record: ILawyercase, index: number) => {
                        return (
                            <IonRow className='Row' key={index}>
                                <IonCol className='Col'>{record.ref}</IonCol>
                                <IonCol className='Col'>{record.state ? "Clôturé" : "En cours"}</IonCol>
                                <IonCol className='Col'>
                                    {record.clients ? record.clients.map((client: IClientData, index: number) => {
                                        return (
                                            client.name + " " + client.firstname + " / "
                                        )
                                    }) : "Aucun client"}
                                </IonCol>
                                <IonCol className='Col'>
                                    <IonButtons>
                                        <IonButton>
                                            <IonIcon slot="icon-only" icon={pencil}/>
                                        </IonButton>
                                        <IonButton>
                                            <IonIcon slot="icon-only" icon={trash}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddRecord isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            <IonItem>
                <IonButtons slot="end">
                    <IonButton className='Pages' color="black">Previous</IonButton>
                    <IonButton color="black">1</IonButton>
                    <IonButton color="black">2</IonButton>
                    <IonButton color="black">3</IonButton>
                    <IonButton className='Pages' color="black">Next</IonButton>
                </IonButtons>
            </IonItem>
        </IonPage>
    );
}

export default Records;