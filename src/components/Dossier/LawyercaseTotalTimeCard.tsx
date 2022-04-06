import React, {useEffect, useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonTitle} from "@ionic/react";
import {timeOutline, timeSharp} from "ionicons/icons";
import IEventData from "../../types/event.type";

interface ILawyercaseEvent {
    lawyercaseEvent?: IEventData[];
}

const LawyercaseTotalTimeCard = (lawyercaseEvent: ILawyercaseEvent) => {

    const [totalTime, setTotalTime] = useState(0);
    const ttCalculation = () => {
        let tt = 0;
        if (lawyercaseEvent.lawyercaseEvent) {
            for (let i = 0; i < lawyercaseEvent.lawyercaseEvent.length; i++) {
                tt += lawyercaseEvent.lawyercaseEvent[i].duration;
            }
            setTotalTime(tt)
        }
    }

    useEffect(() => {
        ttCalculation()
    }, [ttCalculation]);

    return (
        <IonCard>
            <IonCardHeader>
                <IonItem lines="none">
                    <IonIcon ios={timeOutline} md={timeSharp}/>
                    <IonTitle>Total : Temps en heures : {totalTime} mins</IonTitle>
                </IonItem>
            </IonCardHeader>
            <IonCardContent>
            </IonCardContent>
        </IonCard>

    )
}
export default LawyercaseTotalTimeCard