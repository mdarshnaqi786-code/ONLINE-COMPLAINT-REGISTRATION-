import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaClock,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowRight,
} from "react-icons/fa";
import api from "../../services/api";
import { STATUS_ORDER, getStatusConfig } from "../../utils/statusConfig";

function HomePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/complaints");
        setComplaints(res.data.complaints || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchComplaints();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const total = complaints.length;
  const openCount = complaints.filter(
    (c) => c.status === "Pending" || c.status === "Assigned" || c.status === "Accepted"
  ).length;
  const recent = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">ComplaintHub</h1>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <FaUserCircle />
            {user?.name}
          </span>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome, {user?.name}
        </h2>
        <p className="text-slate-500 mt-2">
          Manage your complaints from your dashboard.
        </p>

        {/* Snapshot */}
        {!loading && total > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">Total Complaints</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">
                {total}
              </h3>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">Currently Open</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">
                {openCount}
              </h3>
            </div>
            {STATUS_ORDER.filter((s) => s === "Completed" || s === "Rejected").map(
              (status) => {
                const cfg = getStatusConfig(status);
                const count = complaints.filter(
                  (c) => c.status === status
                ).length;
                return (
                  <div
                    key={status}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
                  >
                    <p className="text-slate-500 text-sm">{cfg.label}</p>
                    <h3 className={`text-3xl font-bold mt-1 ${cfg.stat}`}>
                      {count}
                    </h3>
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <FaClipboardList className="text-blue-600" size={36} />
            <h3 className="text-xl font-bold mt-5 text-slate-800">
              Register Complaint
            </h3>
            <p className="mt-3 text-slate-500 flex-1">
              Submit a new complaint for review.
            </p>
            <Link
              to="/user/complaint"
              className="inline-flex items-center gap-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition w-fit"
            >
              Register
              <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <FaClock className="text-emerald-600" size={36} />
            <h3 className="text-xl font-bold mt-5 text-slate-800">
              Complaint Status
            </h3>
            <p className="mt-3 text-slate-500 flex-1">
              Track the progress of everything you've filed.
            </p>
            <Link
              to="/user/status"
              className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition w-fit"
            >
              View
              <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <FaUserCircle className="text-purple-600" size={36} />
            <h3 className="text-xl font-bold mt-5 text-slate-800">
              My Profile
            </h3>
            <p className="mt-3 text-slate-500 flex-1">
              {user?.email}
              <br />
              {user?.phone}
            </p>
          </div>
        </div>

        {/* Recent activity */}
        {!loading && recent.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                Recent Complaints
              </h3>
              <Link
                to="/user/status"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {recent.map((complaint) => {
                const cfg = getStatusConfig(complaint.status);
                const Icon = cfg.icon;
                return (
                  <div
                    key={complaint._id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-semibold text-slate-800 line-clamp-1">
                        {complaint.name}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${cfg.badge}`}
                      >
                        <Icon size={10} />
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                      {complaint.comment}
                    </p>
                    <p className="text-slate-400 text-xs mt-3">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
