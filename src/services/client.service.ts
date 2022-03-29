import http from "../http-common";
import  IClientData from "../types/client.type";

class ClientDataService {
    getAll(){
        return http.get<IClientData[]>("/clients")
    }

    create(data:Object) {
        return http.post<IClientData[]>("/clients", data);
    }

    get(id:string) {
        return http.get(`/clients/${id}`);
    }

    update(id:string, data:Object) {
        return http.put(`/tutorials/${id}`, data);
    }
    delete(id:string) {
        return http.delete(`/tutorials/${id}`);
    }
    deleteAll() {
        return http.delete(`/tutorials`);
    }
    findByTitle(title:string) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default  new ClientDataService();