import React, {useState} from "react";
import IClientData from "../../types/client.type";
import ClientDataService from "../../services/client.service";

const AddClientComponent: React.FC = () => {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const [states, setStates] = useState<IClientData>({
        name:"",
        firstname:"",
        address:"",
        birthdate:""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates({...states, [e.target.name] : e.target.value.trim()})
    }

    const saveClient = () => {
        const client: IClientData = {
            name: states.name,
            firstname: states.firstname,
            address: states.address,
            birthdate: states.birthdate
        }

        ClientDataService.create(client)
            .then((res: any) => {
                console.log(res);
                setSubmitted(true);
            })
            .catch((e: Error) => {
            console.log(e)
        })
    }

    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h2>Client ajouté avec succès !</h2>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Nom: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={states.name}
                            onChange={handleChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            required
                            value={states.firstname}
                            onChange={handleChange}
                            name="firstname"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse:  </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            required
                            value={states.address}
                            onChange={handleChange}
                            name="address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Date de naissance:  </label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthdate"
                            required
                            value={states.birthdate}
                            onChange={handleChange}
                            name="birthdate"
                        />
                    </div>
                    <button onClick={saveClient} className="btn btn-success">
                        Ajouter
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddClientComponent;