import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaSignOutAlt,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

function AdminHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const sections = [
    {
      to: "/admin/users",
      icon: FaUsers,
      color: "text-blue-600 bg-blue-50",
      title: "Users",
      description: "View all registered citizens.",
    },
    {
      to: "/admin/agents",
      icon: FaUserTie,
      color: "text-emerald-600 bg-emerald-50",
      title: "Agents",
      description: "View all complaint-handling agents.",
    },
    {
      to: "/admin/complaints",
      icon: FaClipboardList,
      color: "text-purple-600 bg-purple-50",
      title: "Complaints",
      description: "Review and assign complaints to agents.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">ComplaintHub</h1>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FaUserShield />
              <span>{user?.name}</span>
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Manage users, agents and complaints across the platform.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {sections.map(({ to, icon: Icon, color, title, description }) => (
            <Link
              key={to}
              to={to}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className={`inline-flex p-4 rounded-2xl ${color}`}>
                <Icon size={32} />
              </div>

              <h2 className="text-2xl font-bold mt-5 text-slate-800">
                {title}
              </h2>

              <p className="text-slate-500 mt-2">{description}</p>

              <span className="inline-flex items-center gap-2 mt-5 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                View
                <FaArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
