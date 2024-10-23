import './Home.css';
import React from 'react';
import NavbarTop from '../navbar/NavbarTop';
import Footer from '../footer/Footer';
import PropertyDetailsHomePage from '../property-details-home-page/PropertyDetailsHomePage';

const Home = () => {

    return (
        <>
        
            <div className="homeContent1-container" >
            <NavbarTop />

            </div>

            <PropertyDetailsHomePage />

            <Footer />

        </>
    );

}

export default Home;