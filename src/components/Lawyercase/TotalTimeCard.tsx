import React, {useEffect, useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonTitle} from "@ionic/react";
import {timeOutline, timeSharp} from "ionicons/icons";
import IEventData from "../../types/event.type";

interface ILawyercaseEvent {
    lawyercaseEvent?: IEventData[];
}

const TotalTimeCard = (lawyercaseEvent: ILawyercaseEvent) => {

    const [totalTime, setTotalTime] = useState<string>("");

    const ttCalculation = () => {
        let tt = 0;
        if (lawyercaseEvent.lawyercaseEvent) {
            for (let i = 0; i < lawyercaseEvent.lawyercaseEvent.length; i++) {
                tt += lawyercaseEvent.lawyercaseEvent[i].duration;
            }
            let convertedTime = convertTime(tt);
            setTotalTime(convertedTime);
        }
    }
    
    const convertTime = (time: number) => {
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
        return `${hours}h ${minutes}m`
    }

    useEffect(() => {
        ttCalculation()
    }, [ttCalculation]);

    return (
        <IonCard>
            <IonCardHeader>
                <IonItem lines="none">
                    <IonIcon ios={timeOutline} md={timeSharp}/>
                    <IonTitle>Total Temps : {totalTime}</IonTitle>
                </IonItem>
            </IonCardHeader>
            <IonCardContent>
            </IonCardContent>
        </IonCard>

    )
}
export default TotalTimeCard;