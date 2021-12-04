import React, { useState, useEffect } from 'react';
import PremiumCard from "./PremiumCard";
import treelineLg from './imgs/treelineLg.png';
import treelineSm from  './imgs/treelineSm.png'
import NavAfterConnect from './NavAfterConnect';
import Footer from './Footer';
import gsap from 'gsap';


const PremiumSet = () => {
   
    const imageUrl = useWindowWidth() >= 650 ? treelineLg : treelineSm;

    
        return (
            <div id="treelineImg" className="treelineImg" style={{ backgroundImage:`url(${ imageUrl })` }}>
                <NavAfterConnect/>
                <div className="cardContainer colStep" >
                    <PremiumCard/>
                    <div className="crumbColSolo">
                        <h5 className="crumbTitleSolo">
                            <span className="crumbNumbersSolo">3. </span>Premium Set
                        </h5>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    };

    const useWindowWidth = () => {
        const [windowWidth, setWindowWidth ] = useState(window.innerWidth);
    
    
        useEffect(() => { 
             
            gsap.fromTo('.treelineImg',{opacity:0 }, {opacity: 1, duration: 4 });

            const handleWindowResize = () => {
                setWindowWidth(window.innerWidth);
            };
            
            window.addEventListener('resize', handleWindowResize); 
            
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            }
    
        }, []);
    
        return windowWidth;
    };

export default PremiumSet;