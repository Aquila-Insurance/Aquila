import React, { useState, useEffect } from 'react';
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import { useNavigate } from 'react-router';
import { contractAddress } from './Config';
import { ABI } from './Config';
import Moralis from 'moralis';
import gsap from 'gsap';


//for test case the user object is not encrypted -->else Moralis.enableEncryptedUser();

const ConfirmButton = () => {

    let navigate = useNavigate();
    const currentUser = Moralis.User.current();
    const { web3, account } = useMoralis();
    const policyAddress = account;
    const productId = "0";  //product 0 with multiplier x2
    const amount = 0.01 * 10 ** 18;   //in Wei
    
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const [ hasContract, setHasContract ] = useState(false);

    const getPropertyCoordinates = () => {
        if ( currentUser ) {
            console.log( currentUser )
            const coordinates = ( currentUser.get('property' ?? "" ))
            return coordinates;
        } else {
            console.log ("user needs to authenticate");
            navigate('/');
        }
    }
    
    const propertyCoordinates = getPropertyCoordinates();
    console.log("these are the propertyCoordinates-->", propertyCoordinates);


        const { data, error, fetch, isFetching } = useWeb3ExecuteFunction({
            abi: ABI,
            contractAddress: contractAddress,
            functionName: "buyPolicy",
            msgValue: amount,
            params: {
                _policyAddress: policyAddress,
                _productId: productId,
                _iplCoordinates: propertyCoordinates,
            },
        });
    
    const hideComponent=()=>{
        setHasContract(true);
    }

    useEffect(() => {   
        gsap.to('.card', {opacity: 1 }, {opacity: 0, duration: 4 });

    }, []);

    return (<div id="smartContractData">
            { error }
            
            { 
            hasContract ? 
            data && 

            <pre id="smartContractReturn"> 
                {
                JSON.stringify(data, null, 2 ) 
                }
            </pre>:
            <div className="cardContainer colStep">
                <div className="card">
                    <h4>TOTAL: 0.01ETH</h4><br></br>
                    <p id="confirmMessage" className="cardText confirmCardText">We have calculated your Fire Season Premium. Insure your home and property
                    April 1st to September 30th, 2022.</p>
                    <button 
                    id="confirmBtn" className="btn" 
                    onClick={  () => { fetch(); hideComponent(); } }
                    disabled={ isFetching }>Confirm and Pay</button>
                </div>
                <div className="crumbColSolo">
                    <h5 className="crumbTitleSolo">
                        <span className="crumbNumbersSolo">4. </span>Confirm and Pay
                    </h5>
                </div>
            </div>
            }
        </div>)
};

export default ConfirmButton;

//