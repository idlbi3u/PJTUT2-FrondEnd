import IClientData from "./client.type";

export default interface ILawyercase {
    id?: any | null,
    ref: string,
    description: string,
    state: boolean,
    closed_at?: string | null,
    createdAt?: string,
    updatedAt?: string,
    clients?: [IClientData]
}