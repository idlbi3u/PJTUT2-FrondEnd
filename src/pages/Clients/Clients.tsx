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
    IonTitle, 
    IonToolbar, 
    SearchbarChangeEventDetail} from '@ionic/react';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp, addOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Clients.css';
import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import AddClient from '../../components/Client/AddClient';



const Clients: React.FC = () => 
{
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteClient = (id: string) => {
        deleteClient(id); 
    }

    const handleModifyClient = (id: string) => {
        
    }

    const [clients, setClients] = useState<IClientData[]>([]);

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteClient = (id:string) => {
        ClientDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
        })
            .catch((e:Error) => {
                console.log(e)
            })
    }

    const handleSearchClient = async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        if(e.detail.value === ""){
            retrieveClients()
        }
        
        await ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
        if(e.detail.value){
            let tlc = e.detail.value.toLocaleLowerCase();
            let filterData = clients.filter((e) =>{
                let nameTlc = e.name.toLocaleLowerCase();
                return nameTlc.indexOf(tlc) !== -1
            })
            
            setClients(filterData)
        }

    }

    useEffect(() => {
        retrieveClients();  

    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none' slot='start'>
                        <IonButtons slot='start'>
                            <IonBackButton defaultHref='/home' ></IonBackButton>
                        </IonButtons>
                        <IonTitle>Clients</IonTitle> 
                    </IonItem>                   
                                      
                </IonToolbar>
                <IonItem lines='none'>
                    <IonSearchbar 
                    onIonChange={(e) => handleSearchClient(e)} 
                    class='search-bar' 
                    type='text' 
                    placeholder="Rechercher par nom"></IonSearchbar>
                </IonItem>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => {setIsOpen(true)}} >
                            <IonIcon icon={addOutline}></IonIcon>Ajouter
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
                    {clients.map((client: IClientData, index: number) => {

                        return(
                        <IonRow key={index}>
                            <IonCol>12/333</IonCol>
                            <IonCol>En Cours</IonCol>
                            <IonCol>{client.name + ' '+ client.firstname}</IonCol>
                            <IonCol>
                                <IonButtons>
                                    <IonButton onClick={() => {handleDeleteClient(client.id)}}>
                                        <IonIcon ios={trashBinOutline} md={trashBinSharp}></IonIcon>
                                    </IonButton>
                                    <IonButton onClick={() => {handleModifyClient(client.id)}}>
                                        <IonIcon ios={pencilOutline} md={pencilSharp}></IonIcon>
                                    </IonButton>
                                </IonButtons>
                            </IonCol>
                        </IonRow>
                        )
                    })}
                </IonGrid>
            </IonContent>
            <AddClient isOpen={isOpen} setIsOpen={() => setIsOpen(false)}/>
        </IonPage>
    );
}

export default Clients;