import { IonButton, IonButtons,  IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import {  folderOpenOutline, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import './Records.css';

const DetailsRecord: React.FC = () =>
{
    interface DetailRecord {
        id: number;
    
    }
    
    const [detailrecord, setDetailRecord] = useState<DetailRecord[]>([]);
    return (
        <IonPage>
            <IonHeader>      
                <IonToolbar>
                        <IonTitle>Dossier</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonToolbar>
                    <IonButtons>
                        <IonButton >
                            <IonIcon slot="icon-only" icon={folderOpenOutline} />  
                        </IonButton>
                    </IonButtons>   
                    <IonButtons slot='end'>
                        <IonButton className='ModifButton'>Modifier Dossier</IonButton>
                        <IonButton className='DeleteButton'>Supprimer</IonButton>
                    </IonButtons>   
                </IonToolbar>
                    <IonLabel className='DetailsRecord'>description</IonLabel>   
                    <IonTextarea readonly> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a nisi ullamcorper, blandit lectus ac, blandit dolor. Curabitur a nisi elementum, cursus nibh nec, iaculis neque. Mauris cursus placerat risus, vitae hendrerit lectus euismod vitae.
                     Nullam a varius elit. Pellentesque sed sollicitudin lorem. Nam pellentesque lacinia ipsum id luctus. Praesent nec placerat ligula, id euismod mi. In sapien ex, fermentum id neque vel, ornare consectetur tellus. 
                    Aliquam erat volutpat. In ut lacus eget lorem pretium facilisis sed id odio. Phasellus eu mauris at dolor mattis mattis non eu risus. Suspendisse rutrum ligula nec elit commodo, non auctor ex pellentesque.
                     Donec quis dapibus augue, eu luctus nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    </IonTextarea>
                    <IonLabel className='DetailsRecord'>Clients concernés</IonLabel>   
                    <IonTextarea readonly> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nullam a varius elit. 
                    </IonTextarea>
                    <IonLabel className='DetailsRecord'>Évènements</IonLabel>   
                    <IonTextarea readonly> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a nisi ullamcorper, blandit lectus ac, blandit dolor. Curabitur a nisi elementum, cursus nibh nec, iaculis neque. Mauris cursus placerat risus, vitae hendrerit lectus euismod vitae.
                     Nullam a varius elit. Pellentesque sed sollicitudin lorem. Nam pellentesque lacinia ipsum id luctus. Praesent nec placerat ligula, id euismod mi. In sapien ex, fermentum id neque vel, ornare consectetur tellus. 
                    </IonTextarea>
                    <IonButtons>
                    <IonButton className='AddButton'>ajouter un évènement</IonButton>
                    </IonButtons>
                    <IonLabel className='DetailsRecord'>Total : </IonLabel>   
                    <IonText> 
                    Lorem ipsum dolor sit amet
                    </IonText>
                    <IonItem>
                    </IonItem>    
            </IonContent>   
        </IonPage>
    );
}

export default DetailsRecord;