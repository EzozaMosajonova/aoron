import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { TbCategory } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { PiResize } from "react-icons/pi";
import { IoIosColorFilter } from "react-icons/io";
import { FaQuestion } from "react-icons/fa6";
import { IoCarOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";




function Layout() {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshtoken');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (Drawer) */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#f4f6f8',
                        padding: '20px',
                    },
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold' }}>Admin Panel</Typography>
                <NavLink
                    to="/"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <TbCategory className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Products
                        </button>
                    )}
                </NavLink>
                <NavLink
                    to="/category"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <MdOutlineCategory className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Categories
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/discount"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <RiDiscountPercentLine className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Discount
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/sizes"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <PiResize className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Sizes
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/colors"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <IoIosColorFilter className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Colors
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/faq"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <FaQuestion className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Faq
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/contact"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? ' text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <RiContactsLine className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Contact
                        </button>
                    )}
                </NavLink>
                <NavLink
                    to="/team"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? ' text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <RiTeamLine className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Team
                        </button>
                    )}
                </NavLink>
                <NavLink
                    to="/news"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? ' text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <IoNewspaperOutline className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            News
                        </button>
                    )}
                </NavLink>

            </Drawer>


            {/* Main content area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh' }}>
                {/* AppBar */}
                <AppBar position="fixed" sx={{ backgroundColor: '#000957', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <button className=" text-white px-5 py-2 rounded-lg  " onClick={Logout}>
                        <IoExitOutline className='text-3xl'/>
                        </button>
                    </Toolbar>
                </AppBar>

                {/* Content Area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 3, marginTop: '64px', bgcolor: '#0u9u4' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
