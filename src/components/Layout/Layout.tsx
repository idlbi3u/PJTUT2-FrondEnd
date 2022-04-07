import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useState} from 'react';
import {useLocation} from 'react-router';
import './Layout.css';
import {folderOutline, folderSharp, homeOutline, homeSharp, peopleOutline, peopleSharp,} from 'ionicons/icons';

interface MenuItem {
    title: string;
    url: string;
    iosIcon: string;
    mdIcon: string;
}

const Layout = () => {
    const location = useLocation();
    const [menuItems] = useState<MenuItem[]>([
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
            url: '/lawyercases',
            iosIcon: folderOutline,
            mdIcon: folderSharp
        }
    ]);

    return (
        <IonMenu className='ionicMenu' side="start" menuId='first' contentId="main" type="overlay">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>LOGO</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                                    <IonIcon slot="start" ios={item.iosIcon} md={item.mdIcon}/>
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