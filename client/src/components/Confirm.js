import React, { useState, useEffect } from 'react';
import ConfirmEvent from "./ConfirmEvent";
import treelineLg from './imgs/treelineLg.png';
import treelineSm from  './imgs/treelineSm.png'
import NavAfterConnect from './NavAfterConnect';
import gsap from 'gsap';
import Footer from './Footer';


const Confirm = () => {

    const imageUrl = useWindowWidth() >= 650 ? treelineLg : treelineSm;

        return (
            <div id="treelineImg" className="treelineImg" style={{ backgroundImage:`url(${ imageUrl })` }}>
                <NavAfterConnect/>
                    <ConfirmEvent/>
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

export default Confirm;