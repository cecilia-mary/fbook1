"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
export default function Header() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    return (
        <header className="w-full sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(34,197,94,0.2)] py-4 px-5 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between flex-wrap">
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 focus:outline-none lg:hidden"
                        >
                            {menuOpen ? (
                                <FaTimes className="text-2xl" />
                            ) : (
                                <FaBars className="text-2xl" />
                            )}
                        </button>
                        <img
                            src="/image/logo.png"
                            alt="JAVIX Tech Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                   
                    <nav className="hidden lg:flex items-center space-x-10 text-gray-700 text-xl font-bold">
                        <Link href="/home" className="hover:text-green-400 transition">
                            Home
                        </Link>
                       

                        {!user && (
                            <>
                                <Link
                                    href="/login"
                                    className="font-bold text-gray-700 hover:text-green-400 transition"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 bg-green-600 text-[18px] text-white px-3 py-1 rounded-lg hover:bg-green-400 transition"
                                >
                                    <span className="font-bold">Sign Up</span>
                                </Link>
                            </>
                        )}

                        {user && (
                            <div className="relative">
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer"
                                    onClick={() => setOpen(!open)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-black font-bold text-lg">
                                            {user?.email?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                {open && (
                                    <div className="absolute right-0 mt-2 bg-white shadow rounded-lg p-2 w-40">
                                        <p className="px-2 py-1 text-gray-700 text-sm font-medium">
                                            {user?.email
                                                ?.split("@")[0]
                                                .charAt(0)
                                                .toUpperCase() +
                                                user?.email?.split("@")[0].slice(1)}
                                        </p>
                                        <button
                                            className="mt-2 w-full text-center rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>

        
                    <div className="hidden md:flex lg:hidden items-center gap-4 ml-auto">
                        {!user && (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 font-medium hover:text-green-400 transition"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-400 transition font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                
                <div className="flex md:hidden justify-center items-center gap-4 mt-3">
                    {!user && (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-700 font-medium hover:text-green-400 transition"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-400 transition font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>


                {menuOpen && (
                    <div className="lg:hidden mt-4 bg-gray-50 rounded-lg shadow p-4 flex flex-col space-y-3 text-gray-700 text-lg font-semibold">
                        <Link href="/home" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                       
                        {user && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="bg-red-600 text-white px-3 py-1 rounded-lg text-center hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>

    );

}