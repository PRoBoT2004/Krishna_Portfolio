import { useLocalAuth } from '../hooks/useLocalAuth';
import AdminLogin from '../components/admin/AdminLogin';
import FileProjectManager from '../components/admin/FileProjectManager';
import { LogOut } from 'lucide-react';

const AdminPage = () => {
  const { user, logout } = useLocalAuth();

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="p-4 border-b bg-gray-900/50 border-orange-500/20">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-orange-400">File-Based Admin</h1>
            <p className="text-sm text-gray-400">Add projects that persist when deployed</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-white"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <FileProjectManager />
    </div>
  );
};

export default AdminPage;