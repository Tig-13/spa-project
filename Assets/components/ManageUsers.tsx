import { useEffect, useState } from 'react';
import { User } from '../assets/global/types';
import { useAppStore } from '../assets/store/appstore';


interface ManageUsersProps {}

const ManageUsers: React.FC<ManageUsersProps> = () => {
    const { currentUser } = useAppStore();
    const [users, setUsers] = useState<User[]>([]);
    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [editedUser, setEditedUser] = useState<User>({ id: 0, username: '', role: 'User' });
    const [newUser, setNewUser] = useState<{ username: string, role: string }>({ username: '', role: 'User' });
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/test/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleEdit = (user: User) => {
        setEditUserId(user.id);
        setEditedUser({ ...user });
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
    };

    const handleDelete = async (userId: number) => {
        const response = await fetch(`/api/user/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setUsers(users.filter((u) => u.id !== userId));
        }
    };

    const handleUpdate = async () => {
        const response = await fetch(`/api/user/${editedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            setEditUserId(null);
        }
    };

    const handleAddUser = async () => {
        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUser.username,
                password: '0000',
                role: newUser.role,
            }),
        });

        if (response.ok) {
            const addedUser = await response.json();
            setUsers([...users, addedUser]);
            setNewUser({ username: '', role: 'User' });
            setShowAddUserForm(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Users - {currentUser?.username}</h2>
            <button
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                {showAddUserForm ? 'Cancel' : 'Add User'}
            </button>

            {showAddUserForm && (
                <div className="mb-4">
                    <h3 className="text-xl mb-2">Add New User</h3>
                    <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        placeholder="Username"
                        className="border p-2 mb-2 w-full"
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                    </select>
                    <button
                        onClick={handleAddUser}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add User
                    </button>
                </div>
            )}

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            {editUserId === user.id ? (
                                <>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            value={editedUser.username}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, username: e.target.value })
                                            }
                                            className="border p-2"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <select
                                            value={editedUser.role}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, role: e.target.value })
                                            }
                                            className="border p-2"
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="border px-4 py-2">{user.username}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
