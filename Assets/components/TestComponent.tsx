import React, { useState, useEffect } from 'react';

interface Admin {
    id: number;
    username: string;
    password: string;
    role: string;
}

const TestComponent: React.FC = () => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewAdmin, setIsNewAdmin] = useState(false);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch('/api/user/check-admin');
                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data);
                } else {
                    setIsNewAdmin(true);
                }
            } catch (error) {
                console.error('Error fetching admin:', error);
            }
        };

        fetchAdmin();
    }, []);

    const handleCreateAdmin = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`/api/user/create/${isNewAdmin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'Administrator', 
                    password: password || 'FirstAdmin',
                    role: 'Admin',
                    //isInitialSetup: isNewAdmin
                }),
            });

            if (response.ok) {
                const newAdmin = await response.json();
                setAdmin(newAdmin);
                setIsNewAdmin(false);
            } else {
                console.error('Failed to create admin');
            }
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Admin Information</h2>

            {admin && !isNewAdmin ? (
                <div>
                    <h3 className="text-xl font-bold">Current Admin Info</h3>
                    <p>Admin Username: {admin.username}</p>
                    <p>Admin Role: {admin.role}</p>
                </div>
            ) : isNewAdmin ? (
                <div>
                    <p>Create a new admin with default credentials.</p>
                    <p><strong>Admin Username:</strong> Administrator</p>
                    <input
                        type="password"
                        placeholder="New Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Admin Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />
                    <button
                        onClick={handleCreateAdmin}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Admin
                    </button>
                </div>
            ) : (
                <p>Loading admin data...</p>
            )}
        </div>
    );
};

export default TestComponent;
