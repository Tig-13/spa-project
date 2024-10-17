import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TestComponent from './components/TestComponent';
import ManageUsers from './components/ManageUsers';
import Navbar from './components/Navbar';
import { useAppStore } from './assets/store/appstore';



function App() {

    const { setCurrentUser, logout } = useAppStore();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        logout();
    };

    const fetchTestData = async () => {
        try {
            const res = await fetch('/api/test/');
            const txt = await res.text();
            console.log(txt);
        } catch (error) {
            console.error('Error fetching test data:', error);
        }
    };

    const fetchUsersData = async () => {
        try {
            const res = await fetch('/api/test/users');
            const txt = await res.text();
            console.log(txt);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    useEffect(() => {
        fetchTestData();
        fetchUsersData();
    }, []);

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home handleLogout={handleLogout} count={count} setCount={setCount} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/manage-users" element={<ManageUsers />} />
                    <Route path="/test" element={<TestComponent />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
