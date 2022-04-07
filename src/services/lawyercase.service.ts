import http from "../http-common";
import ILawyercase from "../types/lawyercase.type";
import IEventData from "../types/event.type";

class LawyercaseDataService {

    getAll() {
        return http.get<ILawyercase[]>("/lawyercases")
    }

    create(data: Object) {
        return http.post<ILawyercase[]>("/lawyercases", data);
    }

    addEventToLawyercase(lawyercaseId: number, event: IEventData) {
        return http.put<ILawyercase[]>("/lawyercases/events/" + lawyercaseId, event);
    }


    get(id: string) {
        return http.get(`/lawyercases/${id}`);
    }

    delete(id: string) {
        return http.delete(`/lawyercases/${id}`);
    }

    update(id: string, data: Object) {
        return http.put(`/lawyercases/${id}`, data);
    }

    deleteAll() {
        return http.delete(`/lawyercases`);
    }

    findByRef(ref: string) {
        return http.get(`/lawyercases?title=${ref}`);
    }

    addClient(id: string, clientId: string) {
        return http.put(`/lawyercases/addtolc/${id}/${clientId}`);
    }

    updateStatus(id: string, data: Object) {
        return http.put(`/lawyercases/status/${id}`, data);
    }

    removeClient(id: string, clientId: string) {
        return http.delete(`/lawyercases/removefromlc/${id}/${clientId}`);
    }
}

export default new LawyercaseDataService();