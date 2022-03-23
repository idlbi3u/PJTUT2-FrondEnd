import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { 
    peopleOutline,
    folderOutline,
    homeOutline,

    peopleSharp,
    folderSharp,
    homeSharp,
} from 'ionicons/icons';

interface MenuItem {
    title: string;
    url: string;
    iosIcon: string;
    mdIcon: string;
}
const Layout  = () => 
{
    const location = useLocation();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            title: 'Home',
            url: '/home',
            iosIcon: homeOutline,
            mdIcon: homeSharp
        },
        {
            title: 'Clients',
            url: '/clients',
            iosIcon: peopleOutline,
            mdIcon: peopleSharp
        },
        {
            title: 'Dossiers',
            url: '/records',
            iosIcon: folderOutline,
            mdIcon: folderSharp
        }
    ]);

    return(
        <IonMenu contentId="main" type="overlay">
            <IonContent>    
                <IonList id="app-menu">
                {menuItems.map((item: MenuItem, index) => {
                    return (
                    <IonMenuToggle key={index} autoHide={false}>
                        <IonItem 
                        className={location.pathname === item.url ? 'selected' : ''} 
                        routerLink={item.url} 
                        routerDirection="none" 
                        lines="none" detail={false}
                        >

                        <IonIcon slot="start" ios={item.iosIcon} md={item.mdIcon} />
                        <IonLabel>{item.title}</IonLabel>

                        </IonItem>
                    </IonMenuToggle>
                    );
                })}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Layout;