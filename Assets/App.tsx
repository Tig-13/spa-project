import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TestComponent from './components/TestComponent';
import ManageUsers from './components/ManageUsers';
import Navbar from './components/Navbar';

interface User {
    id: number;
    username: string;
    role: string;
}

function App() {
    const initialUser: User = {
        id: 0,
        username: 'Guest',
        role: 'Guest',
    };

    const [user, setUser] = useState<User>(initialUser);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(initialUser);
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
                <Navbar user={user} />
                <Routes>
                    <Route
                        path="/"
                        element={<Home user={user} handleLogout={handleLogout} count={count} setCount={setCount} />}
                    />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="/manage-users" element={<ManageUsers user={user} />} />
                    <Route path="/test" element={<TestComponent />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
