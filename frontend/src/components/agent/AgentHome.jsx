import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaSignOutAlt,
  FaUserCog,
  FaArrowRight,
} from "react-icons/fa";

function AgentHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-emerald-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">ComplaintHub</h1>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FaUserCog />
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

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-slate-800">Agent Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage your assigned complaints.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Link
            to="/agent/complaints"
            className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-600">
              <FaClipboardList size={32} />
            </div>

            <h2 className="text-2xl font-bold mt-5 text-slate-800">
              Assigned Complaints
            </h2>

            <p className="text-slate-500 mt-2">
              View and update the complaints assigned to you.
            </p>

            <span className="inline-flex items-center gap-2 mt-5 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
              View
              <FaArrowRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AgentHome;
