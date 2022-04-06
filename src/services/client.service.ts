import http from "../http-common";
import IClientData from "../types/client.type";
const fs = window.require("fs").promises;
const isElectron = require("is-electron");

class ClientDataService {
    getAll() {
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                console.log(data);
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
        console.log(client);
        
        if (isElectron()) {
            return fs.readFile("./src/data/clients.json", "utf8").then((data: string) => {
                const clients = JSON.parse(data);
                console.log( clients.slice(-1), "oui");
                client.id = clients.slice(-1)[0].id + 1;
                clients.push(client);
                return fs.writeFile("./src/data/clients.json", JSON.stringify(clients));
            })
            .catch((err: Error) => {
                console.log(err);
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
}

export default new ClientDataService();