import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "./store";
import axios from "axios";


const api = {
    getAll: "http://localhost:8080/api/clients/",

}

// Var dans le redux loading Boolean
// lors du dispatch du init  dispatch = true
//.then  .catch .celui-la dispatch=false
//Create component de Loading et le faire apparaitre quand ca passe a false

interface IClientsList {
    clients: IClient[]
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
    clients: [],
    name: "",
    firstname: "",
    address: "",
    birthdate: "",
    cases: []
}


const setClientsListState = (state: IClientsList, action: any) => {
    state.clients = action.payload
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
    }
})

export const {
    setName,
    setAddress,
    setBirthdate,
    setFirstName,
    setClientsList
} = clientsSlice.actions;

export const getAllClientsReducer = () => (dispatch: AppDispatch) => {

    axios.get(api.getAll)
        .then((response: any) => {
            dispatch(setClientsList(response.data))
        })
        .catch((e: Error) => {
            console.log(e);
        });

}

//delete client
export const deleteClientReducer = (id: string) => (dispatch: AppDispatch) => {
    axios.delete(api.getAll + id)
        .then(() => {
            dispatch(getAllClientsReducer())
        })
        .catch((e: Error) => {
            console.log(e);
        });
}


export default clientsSlice.reducer




