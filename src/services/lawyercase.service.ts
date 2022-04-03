import http from "../http-common";
import IClientData from "../types/client.type";
import  ILawyercase from "../types/lawyercase.type";

class LawyercaseDataService {

    getAll(){
        return http.get<ILawyercase[]>("/lawyercases")
    }

    create(data:Object) {
        return http.post<ILawyercase[]>("/lawyercases", data);
    }

    get(id:string) {
        return http.get(`/lawyercases/${id}`);
    }

    delete(id:string) {
        return http.delete(`/lawyercases/${id}`);
    }

    update(id:string, data:Object) {
        return http.put(`/lawyercases/${id}`, data);
    }

    deleteAll() {
        return http.delete(`/lawyercases`);
    }

    findByRef(ref:string) {
        return http.get(`/lawyercases?title=${ref}`);
    }

    addClient(client: IClientData, lawyercase: ILawyercase) {
        return http.post(`/lawyercases/${lawyercase.id}/addClient/${client.id}`);
    }
}

export default  new LawyercaseDataService();