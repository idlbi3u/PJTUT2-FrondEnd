import http from "../http-common";
import IClientData from "../types/client.type";

const isElectron = require('is-electron');

/*Soit in If soit une interface avec un nouveau middlewear  qui call un ClientDataServiceElectron*/


class ClientDataService {

    getAll() {
        if (isElectron()) {
            console.log('On est en Electron, on doit stocker les data en Local')
            return http.get<IClientData[]>("/clients")
        } else {
            return http.get<IClientData[]>("/clients")
        }
    }

    create(data: Object) {
        return http.post<IClientData[]>("/clients", data);
    }

    get(id: string) {
        return http.get(`/clients/${id}`);
    }

    delete(id: string) {
        return http.delete(`/clients/${id}`);
    }

    update(id?: string, data?: Object) {
        return http.put(`/clients/${id}`, data);
    }
    
}

export default new ClientDataService();