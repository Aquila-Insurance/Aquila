import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis';
// import DrawProperty from './DrawProperty.js';


const PropertyCard = () => {

    let navigate = useNavigate();
    const currentUser = Moralis.User.current();
    const { setUserData, userError, isUserUpdating } = useMoralis();
    

    const changeHandler = e => {
        setUserData({
            property: e.target.value
        })
    }

    async function submitHandler(e) {
       // userCoordinates = "{ \"farm\": " + JSON.stringify((mapLayers[0]["latlngs"])) + "}";
        e.preventDefault();
        await currentUser.save()
        .then((currentUser) =>{ 
            console.log(currentUser)
            navigate('/premium');
        }, (error) => {
            console.log("failed to add coorinates to db", error.message);
        });
    }

    return (
        
        <div className="card">

            <form onSubmit = { submitHandler } autoComplete="off">

                { userError && <p> {userError.message }</p>}
                
                <label>Longitude and Latitude</label>

                <textarea name="property" id="property" onChange={ changeHandler } />

                <input type="submit" value="Submit" onClick = { submitHandler } disabled={ isUserUpdating } className="btn" />

            </form> 
        </div>

    );
};


export default PropertyCard;