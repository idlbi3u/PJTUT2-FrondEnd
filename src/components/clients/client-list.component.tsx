import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import {useEffect, useState} from "react";

const ClientListComponent = () => {

    const [clients, setClients] = useState<IClientData[]>([]);

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const deleteClient = (id:string) => {
        ClientDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
        })
            .catch((e:Error) => {
                console.log(e)
            })
    }

    useEffect(() => {
        //Execute when Mounted
        retrieveClients();

        /*return (
        ) => {
            //Executed when unmount
        };*/

    }, []);//Si cette var change, UpdateComponent

    return (
        <>
            <h1> HELLO CLIENT LIST COMPONENT</h1>
            {clients.map((client, key) =>
                <>
                <div key={key} >{client.name} - {client.firstname} - {client.birthdate} - {client.createdAt}</div>
                <button onClick={() => deleteClient(client.id)}>Supprimer</button>
                </>
            )}
        </>

    )
}
export default ClientListComponent;