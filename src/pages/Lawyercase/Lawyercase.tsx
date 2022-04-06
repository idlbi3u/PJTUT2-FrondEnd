
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRouterLink, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, SearchbarChangeEventDetail, useIonAlert } from '@ionic/react';
import {   addOutline, ellipse, pencilOutline,  pencilSharp,   trashBinOutline, trashBinSharp,  } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Lawyercase.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';
import AddLawyercase from '../../components/Lawyercase/AddLawyercase'
import EditLawyercase from '../../components/Lawyercase/EditLawyercase';

const Lawyercase: React.FC = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [present] = useIonAlert();
    const [isEdit, setIsEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [selectedLawyercase, setSelectedLawyercase] = useState<ILawyercase>();
    const [Lawyercases, setLawyercases] = useState<ILawyercase[]>([]);
    const [filteredLawyercases, setFilteredLawyercases] = useState<ILawyercase[]>(Lawyercases);
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
                setLawyercases(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteLawyercase = (id:string) => {
        LawyercaseDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
        })
            .catch((e:Error) => {
                console.log(e)
            })
    }

    const handleSearchLawyercase = async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        if (e.detail.value === "") {
            retrieveLawyercases()
        }

        await LawyercaseDataService.getAll()
            .then((response: any) => {
                setLawyercases(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = Lawyercases.filter((e) => {
                let nameTlc = e.ref.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })

            setLawyercases(filterData)
        }

    }

    useEffect(() => {
        retrieveLawyercases();  

    }, [isOpen, isEdit, Delete, setLawyercases]);


    useEffect(() => {
        if (filter === "AllBusiness") {
            setFilteredLawyercases(Lawyercases);
        } else if (filter === "OnGoingBusiness") {
            setFilteredLawyercases(Lawyercases.filter(Lawyercase => !Lawyercase.closed_at));
        } else {
            setFilteredLawyercases(Lawyercases.filter(Lawyercase => Lawyercase.closed_at));
        }
    },[filter, Lawyercases]);
  

    return (
        <IonPage>
            <IonHeader>      
                <IonToolbar>
                    <IonItem lines='none'>
                    <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home' ></IonBackButton>
                        </IonButtons>
                        <IonTitle>Dossiers</IonTitle>
                    </IonItem>
                    <IonItem>
                        <IonItem slot='start' className='Business' lines='none'>   
                                <IonSelect placeholder="Selectionnez une catégorie d'affaire" value={filter} onIonChange={e => setFilter(e.detail.value)}>
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
                        <IonButton color='primary' onClick={() => {setIsOpen(true)}} >
                            <IonIcon icon={addOutline}></IonIcon>Ajouter
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
                                        <IonRouterLink class='link' routerLink={'/Lawyercases/view/'+Lawyercase.id}>
                                            {Lawyercase.ref}
                                        </IonRouterLink>
                                    </IonCol>
                                    <IonCol className='Col'><IonIcon color={Lawyercase.closed_at ? "danger" : "success"} ios={ellipse} md={ellipse} /></IonCol>
                                    <IonCol className='Col'>
                                        { Lawyercase.clients?.length }
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
                                                        { text: 'Oui', handler: () => handleDeleteLawyercase(Lawyercase.id)}
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
            <AddLawyercase  isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
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