import React, {useEffect, useState} from 'react';
import ILawyercase from "../../types/lawyercase.type";
import LawyercaseDataService from "../../services/lawyercase.service"
import ClientComponent from "../clients/client.component";


const LawyercaseListComponent = () => {

    const [lawyercases, setLawyercases] = useState<ILawyercase[]>([]);

    const retrieveLawyercases = () => {
        LawyercaseDataService.getAll()
            .then((res:any) => {
                setLawyercases(res.data);
                console.log(res.data);
            })
            .catch((e:Error) => {
                console.log(e);
            })
    }

    const deleteLawyercase = (id:string) => {
        LawyercaseDataService.delete(id)
            .then((res:any) => {
                console.log(res + "A bien été supprimé de la BDD");
            })
            .catch((e:Error) => {
                console.log(e);
            })
    }

    useEffect(() => {
        //Execute when Mounted
        retrieveLawyercases()

        /*return (
        ) => {
            //Executed when unmount
        };*/

    }, []);//Si cette var change, UpdateComponent

    return(
        <>
            {lawyercases.map((lawyercase, key) =>
                <>
                    <div key={key} >{lawyercase.ref} - {lawyercase.description} - {lawyercase.state} - {lawyercase.closed_at}</div>
                    <button onClick={() => deleteLawyercase(lawyercase.id)}>Supprimer</button>
                </>
            )}
        </>

    )


}

export default LawyercaseListComponent;