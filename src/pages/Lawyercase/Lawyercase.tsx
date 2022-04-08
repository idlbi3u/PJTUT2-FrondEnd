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
    IonRouterLink,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToolbar,
    SearchbarChangeEventDetail,
    useIonAlert
} from '@ionic/react';
import {addOutline, ellipse, pencilOutline, pencilSharp, trashBinOutline, trashBinSharp,} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Lawyercase.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';
import AddLawyercase from '../../components/Lawyercase/AddLawyercase'
import EditLawyercase from '../../components/Lawyercase/EditLawyercase';

const isElectron = require('is-electron');

const Lawyercase: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [present] = useIonAlert();
    const [selectedLawyercase, setSelectedLawyercase] = useState<ILawyercase>();
    const [lawyercases, setLawyercases] = useState<ILawyercase[]>([]);
    const [filteredLawyercases, setFilteredLawyercases] = useState<ILawyercase[]>(lawyercases);
    const [filter, setFilter] = useState<string>("AllBusiness");
    
    const handleDeleteLawyercase = (id: string) => {
        setDelete(true);
        deleteLawyercase(id);
    }

    const handleModifyLawyercase = (Lawyercase: any) => {
        setSelectedLawyercase(Lawyercase)
        setIsEdit(true)
    }

    const retrieveLawyercases = () => {
        LawyercaseDataService.getAll()
            .then((response: any) => {
                if (isElectron()) {
                    setLawyercases(response)
                } else {
                    setLawyercases(response.data)
                }
            })
            .catch((e: Error) => {
            });
    }

    const deleteLawyercase = (id: string) => {
        LawyercaseDataService.delete(id)
            .then((res: any) => {
                retrieveLawyercases()
            })
            .catch((e: Error) => {
            })
    }

    const handleSearchLawyercase = (e: CustomEvent<SearchbarChangeEventDetail>) => {
        if (e.detail.value === "") {
            retrieveLawyercases()
        }
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = lawyercases.filter((e) => {
                let nameTlc = e.ref.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })
            setLawyercases(filterData)
        }
    }

    useEffect(() => {
        retrieveLawyercases();    
        
        return () => {
            // cleanup
        }

    }, [Delete, isOpen, isEdit]);

    useEffect(() => {
        return () => {
            
        }
    }, []);


    useEffect(() => {
        if (filter === "AllBusiness") {
            setFilteredLawyercases(lawyercases);
        } else if (filter === "OnGoingBusiness") {
            setFilteredLawyercases(lawyercases.filter(lawyercases => !lawyercases.closed_at));
        } else {
            setFilteredLawyercases(lawyercases.filter(lawyercases => lawyercases.closed_at));
        }
    }, [filter, lawyercases]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home'/>
                        </IonButtons>
                        <IonTitle>Dossiers</IonTitle>
                    </IonItem>
                    <IonItem>
                        <IonItem slot='start' className='Business' lines='none'>
                            <IonSelect placeholder="Selectionnez une catégorie d'affaire" value={filter}
                                       onIonChange={e => {
                                           setFilter(e.detail.value)
                                        }}>
                                <IonSelectOption value="AllBusiness">Toutes les affaires</IonSelectOption>
                                <IonSelectOption value="OnGoingBusiness">Affaires en cours</IonSelectOption>
                                <IonSelectOption value="CompletedBusiness">Affaires cloturées</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem slot='end' className='SearchBar' lines='none'>
                            <IonSearchbar
                                onIonChange={(e) => handleSearchLawyercase(e)}
                                class='search-bar'
                                type='text'
                                placeholder="Rechercher par nom de dossier"/>
                        </IonItem>
                    </IonItem>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton color='primary' onClick={() => {
                            setIsOpen(true)
                        }}>
                            <IonIcon icon={addOutline}/>Ajouter
                        </IonButton>
                    </IonButtons>
                </IonItem>
                <IonGrid text-center>
                    <IonRow className='Row'>
                        <IonCol className='Col'>Code</IonCol>
                        <IonCol className='Col'>Statut</IonCol>
                        <IonCol className='Col'>Clients</IonCol>
                        <IonCol className='Col'>Actions</IonCol>
                    </IonRow>
                    {filteredLawyercases.map((Lawyercase: ILawyercase, index: number) => {
                        return (
                            <IonRow key={index}>
                                <IonCol className='Col'>
                                    <IonRouterLink className='link'
                                                   routerLink={'/Lawyercases/view/' + Lawyercase.id}
                                                   routerDirection="back">
                                        <IonText>{Lawyercase.ref}</IonText>
                                    </IonRouterLink>
                                </IonCol>
                                <IonCol className='Col'><IonIcon color={Lawyercase.closed_at ? "danger" : "success"}
                                                                 ios={ellipse} md={ellipse}/></IonCol>
                                <IonCol className='Col'>
                                    {Lawyercase.clients?.length}
                                </IonCol>
                                <IonCol className='Col'>
                                    <IonButtons>
                                        <IonButton color='primary' onClick={() => {
                                            handleModifyLawyercase(Lawyercase)
                                        }}>
                                            <IonIcon ios={pencilOutline} md={pencilSharp}/>
                                        </IonButton>
                                        <IonButton color='danger' onClick={() => {
                                            present({
                                                cssClass: 'my-css',
                                                header: 'Suppression d\'un client',
                                                message: 'êtes-vous sûr de vouloir supprimer ce dossier ?',
                                                buttons: [
                                                    {text: 'Annuler', role: 'cancel'},
                                                    {text: 'Oui', handler: () => handleDeleteLawyercase(Lawyercase.id)}
                                                ],
                                            })
                                        }}>
                                            <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddLawyercase isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
            {selectedLawyercase ? (
                <EditLawyercase
                    lawyercase={selectedLawyercase}
                    isOpen={isEdit}
                    setIsOpen={() => setIsEdit(false)}
                />
            ) : null}
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

export default Lawyercase;