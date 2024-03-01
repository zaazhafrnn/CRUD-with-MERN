import React, { useState } from 'react';
import Hero from '../component/Hero';
import Navbar from '../component/Navbar';
import About from '../component/About';
import Portfolio from '../component/Portfolio';
import Footer from '../component/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Portfolio />
            <Footer />
        </>
    );
};

export default Home;
