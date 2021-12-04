import React from 'react';
import PremiumButton from './PremiumButton';


const PremiumCard = () => {
    return (
        <div className="card">
            <h4>Thank you!</h4><br></br><p id="premiumCardText" className="cardText">We received your property coordinates and are calculating the Fire Season Premium.</p>
            <PremiumButton/>
        </div>
    );
};


export default PremiumCard;