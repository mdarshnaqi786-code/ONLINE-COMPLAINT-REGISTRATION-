import { useEffect, useState } from "react";
import api from "../../services/api";
import { STATUS_ORDER, getStatusConfig } from "../../utils/statusConfig";

// Agents can only move a complaint forward through these states —
// dropdown options mirror the AssignedComplaint schema's enum.
const AGENT_STATUS_OPTIONS = ["Assigned", "Accepted", "Rejected", "Completed"];

function AgentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/agent/complaints");
      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await api.put(`/agent/complaints/${id}/status`, {
        status,
      });
      await fetchComplaints();
      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to update status"
      );
    }
    setUpdatingId(null);
  };

  const counts = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = complaints.filter((c) => c.status === status).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Assigned Complaints
        </h1>
        <p className="text-slate-500 mt-2">
          View and update the complaints assigned to you.
        </p>

        {!loading && complaints.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {STATUS_ORDER.map((status) => {
              const cfg = getStatusConfig(status);
              const Icon = cfg.icon;
              return (
                <div
                  key={status}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
                >
                  <Icon className={cfg.stat} size={18} />
                  <p className="text-slate-500 text-sm mt-2">{cfg.label}</p>
                  <h3 className={`text-2xl font-bold mt-1 ${cfg.stat}`}>
                    {counts[status]}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="space-y-6 mt-10 animate-pulse">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 h-56"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 mt-10">
            {complaints.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center text-lg text-slate-500">
                No complaints have been assigned to you yet.
              </div>
            ) : (
              complaints.map((item) => {
                const cfg = getStatusConfig(item.status);
                const StatusIcon = cfg.icon;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {item.complaint.name}
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm font-mono">
                          ID: {item.complaint._id}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${cfg.badge}`}
                      >
                        <StatusIcon size={14} />
                        {cfg.label}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-3 text-slate-700">
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {item.complaint.address}
                        </p>
                        <p>
                          <span className="font-semibold">City:</span>{" "}
                          {item.complaint.city}
                        </p>
                        <p>
                          <span className="font-semibold">State:</span>{" "}
                          {item.complaint.state}
                        </p>
                        <p>
                          <span className="font-semibold">Pincode:</span>{" "}
                          {item.complaint.pincode}
                        </p>
                        <p>
                          <span className="font-semibold">Assigned By:</span>{" "}
                          {item.assignedBy?.name}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-slate-700">
                          Complaint Description
                        </p>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mt-3 min-h-[100px] text-slate-700">
                          {item.complaint.comment}
                        </div>

                        <div className="mt-6">
                          <p className="text-sm text-slate-500 mb-2">
                            Update Status
                          </p>

                          <select
                            value={item.status}
                            disabled={updatingId === item._id}
                            onChange={(e) =>
                              updateStatus(item._id, e.target.value)
                            }
                            className="border border-slate-300 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                          >
                            {AGENT_STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {getStatusConfig(status).label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
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

export default AgentComplaints;
