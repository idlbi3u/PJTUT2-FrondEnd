import ILawyercase from "./lawyercase.type";

export default interface IClientData {
    id?: any,
    name: string,
    firstname: string,
    address: string,
    birthdate: string,
    createdAt?: string,
    updatedAt?: string,
    lawyercases?: ILawyercase[],
}