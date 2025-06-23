import { useLocalAuth } from '../hooks/useLocalAuth';
import AdminLogin from '../components/admin/AdminLogin';
import ProjectManager from '../components/admin/ProjectManager';
import { LogOut } from 'lucide-react';

const AdminPage = () => {
  const { user, logout } = useLocalAuth();

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="p-4 border-b bg-gray-900/50 border-orange-500/20">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-orange-400">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, {user.email}</p>
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

      <ProjectManager />
    </div>
  );
};

export default AdminPage;