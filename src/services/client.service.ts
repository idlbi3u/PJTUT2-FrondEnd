import http from "../http-common";
import IClientData from "../types/client.type";
import ILawyercase from "../types/lawyercase.type";
import LawyercaseDataService from "./lawyercase.service";
const isElectron = require("is-electron");
let fs: any;
if (isElectron()) {
    fs = window.require("fs").promises;
}

class ClientDataService {
    getAll() {
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                return JSON.parse(data);
            })
            .catch((err: Error) => {
                return [];
            });
        } else {
            return http.get<IClientData[]>("/clients")
        }
    }

    create(client: IClientData) {        
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                const clients = JSON.parse(data);
                client.id = clients.slice(-1)[0].id + 1;
                clients.push(client);
                return fs.writeFile("./src/data/clients.json", JSON.stringify(clients));
            })
            .catch((err: Error) => {
                const clients = [];
                client.id = 1;
                clients.push(client);
                return fs.writeFile("./src/data/clients.json", JSON.stringify(clients));
            });
        } else {
            return http.post<IClientData>("/clients", client);
        }
    }

    get(id: string) {
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                const clients = JSON.parse(data);
                const client = clients.find((client: IClientData) => client.id === parseInt(id));
                this.getLawyercases(id)
                    .then((lawyercases: ILawyercase[]) => {
                        client.lawyercases = lawyercases;
                    });
                return client;
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.get(`/clients/${id}`);
        }
    }

    delete(id: string) {
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                const clients = JSON.parse(data);
                const client = clients.find((client: IClientData) => client.id === parseInt(id));
                clients.splice(clients.indexOf(client), 1);
                return fs.writeFile("./src/data/clients.json", JSON.stringify(clients));
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.delete(`/clients/${id}`);
        }
    }

    update(id?: string, updatedData?: Object) {
        if (isElectron()) {
            return fs.readFile("src/data/clients.json", "utf8").then((data: string) => {
                const clients = JSON.parse(data);
                if (!id) {
                    return null;
                }
                const client = clients.find((client: IClientData) => client.id === parseInt(id));
                Object.assign(client, updatedData);
                return fs.writeFile("src/data/clients.json", JSON.stringify(clients));
            });
        } else {
            return http.put(`/clients/${id}`, updatedData);
        }
    }

    deleteAll() {
        return http.delete(`/clients`);
    }

    findByName(name: string) {
        return http.get(`/clients?name=${name}`);
    }

    getLawyercases(id: string) {
        return fs.readFile("./src/data/case_client.json", "utf8").then((data: string) => {
            const case_client = JSON.parse(data);
            const lawyercasesId = case_client.filter((case_client: any) => case_client.client_id === parseInt(id));
            
            const lawyercases: ILawyercase[] = [];

            lawyercasesId.forEach((lawyercase: any) => {
                LawyercaseDataService.get(lawyercase.lawyercase_id)
                    .then((lawyercase: ILawyercase) => {
                        lawyercases.push(lawyercase);
                    });
            });

            return lawyercases;
        });
    }
}

export default new ClientDataService();