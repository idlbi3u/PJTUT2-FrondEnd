import http from "../http-common";
import  IClientData from "../types/client.type";

class ClientDataService {
    getAll(){
        return http.get<Array<IClientData>>("/clients")
    }
}

export default  new ClientDataService();