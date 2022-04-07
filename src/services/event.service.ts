import IEventData from "../types/event.type";

export default interface IEventService {

    //create new event to lawercase
    createEvent(eventData: IEventData): Promise<IEventData>;
    
}