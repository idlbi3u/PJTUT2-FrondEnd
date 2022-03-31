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
    IonToolbar,
    SearchbarChangeEventDetail
} from '@ionic/react';
import {addOutline, pencilOutline, pencilSharp, trashBinOutline, trashBinSharp} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import './Records.css';
import LawyercaseDataService from "../../services/lawyercase.service"
import ILawyercase from '../../types/lawyercase.type';


const Records: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCase, setSelectedCase] = useState<ILawyercase>();
    const [filter, setFilter] = useState<string>("all");

    const handleDeleteCase = (id: string) => {
        deleteCase(id);
        window.location.reload();
    }

    const handleModifyCase = (case_: any) => {
        console.log("case:")
        console.log(case_)
    }

    const [cases, setCases] = useState<ILawyercase[]>([]);

    const retrieveCases = () => {
        LawyercaseDataService.getAll()
            .then((response: any) => {
                setCases(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteCase = (id: string) => {
        LawyercaseDataService.delete(id)
            .then((res: any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    const handleSearchCases = async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        if (e.detail.value === "") {
            retrieveCases()
        }

        await LawyercaseDataService.getAll()
            .then((response: any) => {
                setCases(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
        if (e.detail.value) {
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = cases.filter((e) => {
                let refTlc = e.ref.toLocaleLowerCase();
                return refTlc.indexOf(tlc) !== -1
            })

            setCases(filterData)
        }

    }

    useEffect(() => {
        retrieveCases();

    }, []);

    const [filteredCases, setFilteredCases] = useState<ILawyercase[]>(cases);

    useEffect(() => {
        if (filter === "all") {
            setFilteredCases(cases);
        } else if (filter === "open") {
            setFilteredCases(cases.filter((e) => {
                return !e.state;
            }))
        } else {
            setFilteredCases(cases.filter((e) => {
                return e.state;
            }))
        }
    }, [filter, cases]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none' slot='start'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home'/>
                        </IonButtons>

                        <IonTitle>Dossiers</IonTitle>
                    </IonItem>
                </IonToolbar>
                <IonItem lines='none'>
                    <IonItem slot='start'>
                        <IonSelect value={filter} onIonChange={e => setFilter(e.detail.value)}>
                            <IonSelectOption value="all">Tous</IonSelectOption>
                            <IonSelectOption value="open">En cours</IonSelectOption>
                            <IonSelectOption value="close">Clos</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSearchbar
                            onIonChange={(e) => handleSearchCases(e)}
                            class='search-bar'
                            type='text'
                            placeholder="Rechercher par nom"/>
                    </IonItem>
                </IonItem>
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
                    <IonRow>
                        <IonCol>Code</IonCol>
                        <IonCol>Statut</IonCol>
                        <IonCol>Clients</IonCol>
                        <IonCol>Actions</IonCol>
                    </IonRow>
                    {filteredCases.map((case_: ILawyercase, index: number) => {
                        return (
                            <IonRow key={index}>
                                <IonCol>{case_.ref}</IonCol>
                                <IonCol>{ case_.state ? "Clos" : "En cours" }</IonCol>
                                <IonCol>Nom client</IonCol>
                                <IonCol>
                                    <IonButtons>
                                        <IonButton onClick={() => {
                                            handleDeleteCase(case_.id)
                                        }}>
                                            <IonIcon ios={trashBinOutline} md={trashBinSharp}/>
                                        </IonButton>
                                        <IonButton onClick={() => {
                                            handleModifyCase(case_)
                                        }}>
                                            <IonIcon ios={pencilOutline} md={pencilSharp}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            {/* <AddCase isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/> */}
            {selectedCase ? (
                <div>Oui</div>
                // <EditCase
                //     case={selectedCase}
                //     isOpen={isEdit}
                //     setIsOpen={() => setIsEdit(false)}
                // />
            ) : null}

            )

        </IonPage>
    );
}

export default Records;