import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
    user: User | null;
}

interface User {
    id: number;
    username: string;
    role: string;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/'); 
        window.location.reload();
    };

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-semibold">Spa Salon</Link>

                <div className="relative">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-8 w-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                            {/* Меню для всех пользователей */}
                            <Link to="/offers" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                View Offers
                            </Link>

                            {/* Меню для гостей */}
                            {(!user || user.username === "Guest") && (
                                <>
                                    <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
                                        Register
                                    </Link>
                                </>
                            )}

                            {/* Меню для залогиненных пользователей */}
                            {user && user.username !== "Guest" && (
                                <>
                                    {/* Клиенты */}
                                    {user.role === 'User' && (
                                        <>
                                            <Link to="/appointments" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Book Appointment
                                            </Link>
                                            <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Edit Profile
                                            </Link>
                                        </>
                                    )}

                                    {/* Сотрудники */}
                                    {user.role === 'Employee' && (
                                        <>
                                            <Link to="/work-schedule" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Work Schedule
                                            </Link>
                                            <Link to="/client-appointments" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                View Client Appointments
                                            </Link>
                                            <Link to="/performance-analysis" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Performance Analysis & Bonuses
                                            </Link>
                                            <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Edit Profile
                                            </Link>
                                        </>
                                    )}

                                    {/* Администраторы */}
                                    {user.role === 'Admin' && (
                                        <>
                                            <Link to="/work-schedule" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Work Schedule for Employees
                                            </Link>
                                            <Link to="/analytics-reports" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Analytics & Reports
                                            </Link>
                                            <Link to="/client-appointments" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Client Appointments
                                            </Link>
                                            <Link to="/manage-users" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
                                                Manage Users
                                            </Link>

                                            <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Edit Profile
                                            </Link>
                                        </>
                                    )}

                                    {/* Логаут для всех залогиненных пользователей */}
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
