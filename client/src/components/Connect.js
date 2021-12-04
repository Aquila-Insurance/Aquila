import React, { useEffect, useState, useRef } from 'react';
import ConnectCard from './ConnectCard';
import BreadCrumbs from './BreadCrumbs';
import desktopHero from './imgs/desktopHero.png';
import mobileHero from  './imgs/mobileHero.png'
import Copyright from './Copyright';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const Connect = () => {

    const imgRef = useRef()
    const imageUrl = useWindowWidth() >= 650 ? desktopHero : mobileHero;


    return (
        <div id="heroImg" className="heroImg" ref= { imgRef }style={{ backgroundImage:`url(${ imageUrl })` }}>
            <div className="containerFlex">
                <div className="topnavLeft">
                    <Link to="/About">ABOUT</Link>
                </div>
            </div>
                <div className="cardContainer">
                    <ConnectCard/>
                </div>
                <BreadCrumbs/>
                <Copyright/>
        </div>
    );
}

const useWindowWidth = () => {
    
    const [windowWidth, setWindowWidth ] = useState(window.innerWidth);


    useEffect(() => {   

        gsap.fromTo('#heroImg',{opacity:0 }, {opacity: 1, duration: 4 });
        
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



export default Connect;