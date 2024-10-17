import { useAppStore } from "../assets/store/appstore";

interface HomeProps {
    handleLogout: () => void;
    count: number;
    setCount: (value: number) => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout, count, setCount }) =>
{
    const { currentUser } = useAppStore();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-auto text-center">
                <div className="flex justify-center mb-4">
                    <a href="/login" className="text-blue-500 hover:text-blue-600 transition duration-300">Login</a>
                    <span className="mx-2">|</span>
                    <a href="/register" className="text-blue-500 hover:text-blue-600 transition duration-300">Register</a>
                </div>

                <h1 className="text-red-600 text-3xl mt-4">Hello, {currentUser?.username || "Guest"} ({currentUser?.role || "Guest"})</h1>

                <div className="card mt-4">
                    <button onClick={() => setCount(count + 1)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md">
                        count is {count}
                    </button>
                </div>

                {currentUser?.role === 'Admin' && (
                    <div className="mt-4">
                        <a href="/manage-users" className="text-blue-500 hover:text-blue-600 transition duration-300">
                            Manage Users
                        </a>
                    </div>
                )}

                {currentUser?.username !== 'Guest' && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors mt-auto"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
