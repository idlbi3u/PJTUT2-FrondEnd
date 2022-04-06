import http from "../http-common";
import IClientData from "../types/client.type";
import  ILawyercase from "../types/lawyercase.type";
import IEventData from "../types/event.type";
const fs = window.require("fs").promises;
const isElectron = require("is-electron");

class LawyercaseDataService {

    getAll(){
        if (isElectron()) {
            return fs.readFile("./src/data/lawyercases.json", "utf8").then((data: string) => {
                console.log(data);
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
                lawyercase.id = lawyercases.slice(-1)[0].id + 1;
                lawyercases.push(lawyercase);
                return fs.writeFile("./src/data/lawyercases.json", JSON.stringify(lawyercases));
            })
            .catch((err: Error) => {
                console.log(err);
                const lawyercases = [];
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
        return http.put<ILawyercase[]>("/lawyercases/events/" + lawyercaseId, event);
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

    removeClient(id: string, clientId: string) {
        return http.delete(`/lawyercases/removefromlc/${id}/${clientId}`);
    }
}

export default new LawyercaseDataService();