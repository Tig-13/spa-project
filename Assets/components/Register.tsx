import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    setUser: (user: User) => void;
}

interface User {
    id: number;
    username: string;
    role: string;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    role: 'User',
                }),
            });

            if (response.ok) {
                const user: User = await response.json();
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                setErrorMessage('Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
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
                <div>
                    <label className="block text-lg text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
