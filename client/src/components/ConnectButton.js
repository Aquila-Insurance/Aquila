import React from 'react';
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom'


const ConnectButton = () => {

    const navigate = useNavigate();
    const { authenticate } = useMoralis();

    const handleAuthenticate = async () => {
        try {
            await authenticate({ signingMessage:"Aquila Insurance Connection" })
            navigate("/property");
        }   catch( error ) {
            console.log(error)
        }    
    };
    
    return (
        <div>
            <button className="btn" type="button" onClick={ handleAuthenticate }>Connect</button>
        </div>
    );
};

export default ConnectButton;
