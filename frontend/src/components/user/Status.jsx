import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaPlus,
  FaMapMarkerAlt,
  FaUserTie,
  FaLock,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import api from "../../services/api";
import { STATUS_ORDER, getStatusConfig } from "../../utils/statusConfig";

function Status() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data.complaints || []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't load your complaints."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint? This can't be undone.")) return;

    setDeletingId(id);
    try {
      await api.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete this complaint."
      );
    }
    setDeletingId(null);
  };

  const total = complaints.length;
  const counts = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = complaints.filter((c) => c.status === status).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              My Complaints
            </h1>
            <p className="text-slate-500 mt-2">
              View and manage all your registered complaints.
            </p>
          </div>

          <Link
            to="/user/complaint"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 font-semibold transition w-fit"
          >
            <FaPlus />
            New Complaint
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <p className="text-slate-500 text-sm">Total</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              {total}
            </h2>
          </div>

          {STATUS_ORDER.map((status) => {
            const cfg = getStatusConfig(status);
            const Icon = cfg.icon;
            return (
              <div
                key={status}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
              >
                <Icon className={cfg.stat} size={20} />
                <p className="text-slate-500 text-sm mt-2">{cfg.label}</p>
                <h2 className={`text-3xl font-bold mt-1 ${cfg.stat}`}>
                  {counts[status]}
                </h2>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mt-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-6 mt-10 animate-pulse">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 h-64"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6 mt-10">
            {complaints.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
                <FaClipboardList
                  className="mx-auto text-blue-500"
                  size={60}
                />
                <h2 className="text-2xl font-bold mt-6 text-slate-800">
                  No Complaints Found
                </h2>
                <p className="text-slate-500 mt-3">
                  You haven't registered any complaints yet.
                </p>
                <Link
                  to="/user/complaint"
                  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                  Register Complaint
                </Link>
              </div>
            ) : (
              complaints.map((complaint) => {
                const cfg = getStatusConfig(complaint.status);
                const StatusIcon = cfg.icon;
                const isEditable = complaint.status === "Pending";

                return (
                  <div
                    key={complaint._id}
                    className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="px-8 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-slate-100">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {complaint.name}
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm font-mono">
                          ID: {complaint._id}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${cfg.badge}`}
                      >
                        <StatusIcon size={14} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="grid md:grid-cols-2 gap-10 p-8">
                      <div className="space-y-5">
                        <div className="flex gap-3">
                          <FaMapMarkerAlt
                            className="text-slate-400 mt-1 shrink-0"
                          />
                          <div>
                            <p className="text-slate-500 text-sm">Address</p>
                            <h3 className="font-semibold text-slate-800">
                              {complaint.address}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pl-7">
                          <div>
                            <p className="text-slate-500 text-sm">City</p>
                            <h3 className="font-semibold text-slate-800">
                              {complaint.city}
                            </h3>
                          </div>
                          <div>
                            <p className="text-slate-500 text-sm">State</p>
                            <h3 className="font-semibold text-slate-800">
                              {complaint.state}
                            </h3>
                          </div>
                        </div>

                        <div className="pl-7">
                          <p className="text-slate-500 text-sm">Pincode</p>
                          <h3 className="font-semibold text-slate-800">
                            {complaint.pincode}
                          </h3>
                        </div>

                        {complaint.assignedAgent && (
                          <div className="flex gap-3 pt-2">
                            <FaUserTie
                              className="text-blue-500 mt-1 shrink-0"
                            />
                            <div>
                              <p className="text-slate-500 text-sm">
                                Assigned Officer
                              </p>
                              <h3 className="font-semibold text-slate-800">
                                {complaint.assignedAgent.name}
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {complaint.assignedAgent.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">
                          Complaint Description
                        </p>
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-2 min-h-[140px]">
                          <p className="leading-7 text-slate-700">
                            {complaint.comment}
                          </p>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm text-slate-500">
                            Submitted On
                          </p>
                          <h3 className="font-semibold text-slate-800">
                            {new Date(complaint.createdAt).toLocaleString()}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="px-8 pb-8 flex flex-wrap items-center gap-4">
                      {isEditable ? (
                        <>
                          <button
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                            onClick={() =>
                              navigate(`/user/edit/${complaint._id}`)
                            }
                          >
                            <FaPen size={14} />
                            Edit Complaint
                          </button>

                          <button
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={() => deleteComplaint(complaint._id)}
                            disabled={deletingId === complaint._id}
                          >
                            <FaTrash size={14} />
                            {deletingId === complaint._id
                              ? "Deleting..."
                              : "Delete Complaint"}
                          </button>
                        </>
                      ) : (
                        <p className="inline-flex items-center gap-2 text-slate-400 text-sm bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
                          <FaLock size={12} />
                          This complaint is already {cfg.label.toLowerCase()},
                          so it can no longer be edited or deleted.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Status;
