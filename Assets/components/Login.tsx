import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../assets/global/types';
import { useAppStore } from '../assets/store/appstore';

interface LoginProps {
    
}

const Login: React.FC<LoginProps> = () => {
    const { setCurrentUser } = useAppStore();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Login component loaded");
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user: User = await response.json();
                setCurrentUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-lg text-gray-700">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-lg text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
