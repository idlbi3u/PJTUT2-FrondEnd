import http from "../http-common";
import  ILawyercase from "../types/lawyercase.type";
import IEventData from "../types/event.type";
import clientService from "./client.service";
import IClientData from "../types/client.type";
const isElectron = require("is-electron");
let fs: any;
if (isElectron()) {
    fs = window.require("fs").promises;
}
class LawyercaseDataService {

    getAll(){
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                return JSON.parse(data);
            })
            .catch((err: Error) => {
                return [];
            });
        } else {
            return http.get<ILawyercase[]>("/lawyercases")
        }
    }

    create(lawyercase:ILawyercase) {
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);
                console.log( lawyercases.slice(-1), "oui");
                lawyercase.clients = [];
                lawyercase.events = [];
                lawyercase.id = lawyercases.slice(-1)[0].id + 1;
                lawyercases.push(lawyercase);
                return fs.writeFile("./src/data/lawyercases.json", JSON.stringify(lawyercases));
            })
            .catch((err: Error) => {
                const lawyercases = [];
                lawyercase.clients = [];
                lawyercase.events = [];
                lawyercase.id = 1;
                lawyercases.push(lawyercase);
                return fs.writeFile("./src/data/lawyercases.json", JSON.stringify(lawyercases));
            });
        } else {
            return http.post<ILawyercase[]>("/lawyercases", lawyercase);
        }
    }

    get(id:string) {
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);
                const lawyercase = lawyercases.find((lawyercase: ILawyercase) => lawyercase.id === parseInt(id));
                this.getClients(id)
                    .then((clients: IClientData[]) => {
                        lawyercase.clients = clients;
                    });
                    
                return lawyercase;
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.get(`/lawyercases/${id}`);
        }
    }

    delete(id:string) {
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);
                const lawyercase = lawyercases.find((lawyercase: ILawyercase) => lawyercase.id === parseInt(id));
                lawyercases.splice(lawyercases.indexOf(lawyercase), 1);
                return fs.writeFile("./src/data/lawyercases.json", JSON.stringify(lawyercases));
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.delete(`/lawyercases/${id}`);
        }
    }

    update(id:string, updatedData:Object) {
        if (isElectron()) {
            return fs.readFile("src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);
                const lawyercase = lawyercases.find((lawyercase: ILawyercase) => lawyercase.id === parseInt(id));
                Object.assign(lawyercase, updatedData);
                return fs.writeFile("src/data/lawyercases.json", JSON.stringify(lawyercases));
            });
        } else {
            return http.put(`/lawyercases/${id}`, updatedData);
        }

    }

    addEventToLawyercase(lawyercaseId: number, event: IEventData) {
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);   
                const lawyercase = lawyercases.find((lawyercase: ILawyercase) => lawyercase.id === lawyercaseId);
                if (lawyercase.events) {
                    lawyercase.events.push(event);
                } else {
                    lawyercase.events = [event];
                }
                return fs.writeFile("./src/data/lawyercases.json", JSON.stringify(lawyercases));
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.put<ILawyercase[]>("/lawyercases/events/" + lawyercaseId, event);
        }
    }

    deleteAll() {
        return http.delete(`/lawyercases`);
    }

    findByRef(ref: string) {
        return http.get(`/lawyercases?title=${ref}`);
    }

    addClient(id: string, clientId: string) {
        if (isElectron()) {
            return fs.readFile("./src/data/case_client.json", "utf8").then((data: string) => {
                const case_client = JSON.parse(data);
                const case_client_data = {
                    lawyercase_id: parseInt(id),
                    client_id: parseInt(clientId)
                };
                case_client.push(case_client_data);
                return fs.writeFile("./src/data/case_client.json", JSON.stringify(case_client));
            })
            .catch((err: Error) => {
                const case_client = [];
                const case_client_data = {
                    lawyercase_id: parseInt(id),
                    client_id: parseInt(clientId)
                };
                case_client.push(case_client_data);
                return fs.writeFile("./src/data/case_client.json", JSON.stringify(case_client));
            });
        } else {
            return http.put(`/lawyercases/addtolc/${id}/${clientId}`);
        }
    }

    updateStatus(id: string, updatedData: Object) {
        if (isElectron()) {
            return fs.readFile("src/data/lawyercases.json", "utf8").then((data: string) => {
                const lawyercases = JSON.parse(data);
                const lawyercase = lawyercases.find((lawyercase: ILawyercase) => lawyercase.id === parseInt(id));
                Object.assign(lawyercase, updatedData);
                return fs.writeFile("src/data/lawyercases.json", JSON.stringify(lawyercases));
            });
        } else {
            return http.put(`/lawyercases/status/${id}`, updatedData);
        }
    }

    removeClient(id: string, clientId: string) {
        if (isElectron()) {
            return fs.readFile("./src/data/case_client.json", "utf8").then((data: string) => {
                const case_client = JSON.parse(data);
                const case_client_data = {
                    lawyercase_id: parseInt(id),
                    client_id: parseInt(clientId)
                };
                case_client.splice(case_client.indexOf(case_client_data), 1);
                return fs.writeFile("./src/data/case_client.json", JSON.stringify(case_client));
            })
            .catch((err: Error) => {
                return null;
            });
        } else {
            return http.delete(`/lawyercases/removefromlc/${id}/${clientId}`);
        }
    }

    getClients(id: string) {
        return fs.readFile("./src/data/case_client.json", "utf8").then((data: string) => {
            const case_client = JSON.parse(data);
            const clientsId = case_client.filter((case_client: any) => case_client.lawyercase_id === parseInt(id));
            
            const clients: IClientData[] = [];

            clientsId.forEach((client: any) => {
                clientService.get(client.client_id)
                    .then((client: IClientData) => {
                        clients.push(client);
                    });
            });

            return clients;
        });
    }

}

export default new LawyercaseDataService();