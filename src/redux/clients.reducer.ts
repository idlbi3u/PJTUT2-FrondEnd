import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "./store";
import axios from "axios";


const api = {
    base_link: "http://localhost:8080/api/clients/",
}

interface IClientsList {
    clients: IClient[]
}

interface ISelectedClient {
    selectedClient: IClient
}

interface IClient {
    id?: string,
    name: string,
    firstname: string,
    address: string,
    birthdate: string,
    cratedAt?: string,
    updatedAt?: string,
    cases?: any[]
}

const initialState = {
    selectedClient: {
        id: "",
        name: "",
        firstname: "",
        address: "",
        birthdate: "",
        cratedAt: "",
        updatedAt: "",
        cases: []
    },
    clients: [],
    id: "",
    name: "",
    firstname: "",
    address: "",
    birthdate: "",
    cases: []
}


const setClientsListState = (state: IClientsList, action: any) => {
    state.clients = action.payload
}

const setSelectedClientState = (state: ISelectedClient, action: any) => {
    state.selectedClient = action.payload
}

const setNameState = (state: IClient, action: any) => {
    state.name = action.payload
}

const setFirstnameState = (state: IClient, action: any) => {
    state.firstname = action.payload
}

const setAddressState = (state: IClient, action: any) => {
    state.address = action.payload
}

const setBirthdateState = (state: IClient, action: any) => {
    state.birthdate = action.payload
}

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setName: (state, action) => setNameState(state, action),
        setFirstName: (state, action) => setFirstnameState(state, action),
        setAddress: (state, action) => setAddressState(state, action),
        setBirthdate: (state, action) => setBirthdateState(state, action),
        setClientsList: (state, action) => setClientsListState(state, action),
        setSelectedClient: (state, action) => setSelectedClientState(state, action)
    }
})

export const {
    setClientsList,
    setSelectedClient
} = clientsSlice.actions;

export const getAllClientsReducer = () => (dispatch: AppDispatch) => {
    axios.get(api.base_link)
        .then((response: any) => {
            dispatch(setClientsList(response.data))
        })
        .catch((e: Error) => {
            console.log(e);
        });
}

export const deleteClientReducer = (id: string) => (dispatch: AppDispatch) => {
    axios.delete(api.base_link + id)
        .then(() => {
            dispatch(getAllClientsReducer())
        })
        .catch((e: Error) => {
            console.log(e);
        });
}

export const getSelectedClientReducer = (id: string) => (dispatch: AppDispatch) => {
    axios.get(api.base_link + id)
        .then((response: any) => {
            console.log(response.data);
            dispatch(setSelectedClient(response.data))
        })
        .catch((e: Error) => {
            console.log(e);
        });
}

export const createClientReducer = (client: IClient) => (dispatch: AppDispatch) => {
    axios.post(api.base_link, client)
        .then(() => {
            dispatch(getAllClientsReducer())
        })
        .catch((e: Error) => {
            console.log(e);
        });
}

export default clientsSlice.reducer




