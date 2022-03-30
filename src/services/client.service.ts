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

    delete(id:string) {
        return http.delete(`/clients/${id}`);
    }

    update(id:string, data:Object) {
        return http.put(`/clients/${id}`, data);
    }

    deleteAll() {
        return http.delete(`/clients`);
    }

    findByName(name:string) {
        return http.get(`/clients?name=${name}`);
    }
}

export default  new ClientDataService();