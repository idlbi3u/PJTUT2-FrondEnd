import http from "../http-common";
import ILawyercase from "../types/lawyercase.type";

class LawyercaseDataService {

    getAll() {
        return http.get<ILawyercase[]>("/lawyercases")
    }

    create(data: ILawyercase) {
        return http.post<ILawyercase[]>("/lawyercases", data);
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
}

export default new LawyercaseDataService();