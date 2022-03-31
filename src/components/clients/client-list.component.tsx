import ClientDataService from "../../services/client.service"
import IClientData from "../../types/client.type";
import React, {useEffect, useState} from "react";

const ClientListComponent = () => {

    const [clients, setClients] = useState<IClientData[]>([]);

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
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

    const handleSearchClient = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.value === ""){
            retrieveClients()
        }

        await ClientDataService.getAll()
            .then((response: any) => {
                setClients(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });

        let tlc = e.target.value.toLocaleLowerCase();
        let filterData = clients.filter((e) =>{
            let nameTlc = e.name.toLocaleLowerCase();
            return nameTlc.indexOf(tlc) !== -1
        })

        setClients(filterData)
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
            <div className="clients_search-bar" style={{display:"flex", marginLeft:"2%"}} >
                <input
                    type="text"
                    placeholder="Rechercher par nom"
                    onChange={handleSearchClient}
                />
            </div>
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


/*
value={searchName} onChange={handleSearchName}*/
