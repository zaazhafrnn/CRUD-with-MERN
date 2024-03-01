import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [navbarRef]);

    const toggleNavbar = () => {
        setOpen(!open);
    };


    return (
        <nav className="shadow-md w-full fixed top-0 left-0 z-20 bg-white">
            <div className="max-w-6xl mx-auto px-4" ref={navbarRef}>
                <div className="flex items-center justify-between h-20">
                    <div className="flex-1 flex items-center">
                        <h1 className="font-bold text-2xl cursor-pointer">My Portfolio</h1>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/')}>
                            Home
                        </div>
                        <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/studentlist')}>
                            Student List
                        </div>
                        <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/booklist')}>
                            Book List
                        </div>
                        <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/peminjaman')}>
                            Peminjaman
                        </div>
                    </div>
                    <div className="md:hidden cursor-pointer" onClick={toggleNavbar}>
                        <GiHamburgerMenu size={25} />
                    </div>
                </div>
                <div className={`md:hidden ${open ? 'block' : 'hidden'} absolute top-20 left-0 bg-white w-full`}>
                    <div className="px-6 py-4 text-center">
                        <div className="text-xl pb-6 border-b cursor-pointer" onClick={() => navigate('/')}>
                            Home
                        </div>
                        <div className="text-xl py-6 border-b cursor-pointer" onClick={() => navigate('/studentlist')}>
                            Student List
                        </div>
                        <div className="text-xl py-6 border-b cursor-pointer" onClick={() => navigate('/booklist')}>
                            Book List
                        </div>
                        <div className="text-xl py-6 border-b cursor-pointer" onClick={() => navigate('/peminjaman')}>
                            Peminjaman
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
