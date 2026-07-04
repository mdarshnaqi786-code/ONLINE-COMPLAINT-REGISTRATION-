import { useEffect, useState } from "react";
import api from "../../services/api";
import { getStatusConfig } from "../../utils/statusConfig";

function ComplaintInfo() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState({});
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/complaints");
      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchAgents = async () => {
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data.agents || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAgents();
  }, []);

  const assignComplaint = async (complaintId) => {
    const agentId = selectedAgents[complaintId];

    if (!agentId) {
      return alert("Please select an agent.");
    }

    setAssigningId(complaintId);
    try {
      const res = await api.post("/admin/assign", {
        complaintId,
        agentId,
      });

      alert(res.data.message);
      fetchComplaints();
    } catch (error) {
      alert(error.response?.data?.message || "Assignment Failed");
    }
    setAssigningId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-800">
          All Complaints
        </h1>
        <p className="text-slate-500 mt-2">
          View and assign complaints to agents.
        </p>

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
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center text-lg text-slate-500">
                No Complaints Found
              </div>
            ) : (
              complaints.map((complaint) => {
                const cfg = getStatusConfig(
                  complaint.assignmentStatus || complaint.status
                );
                const StatusIcon = cfg.icon;

                return (
                  <div
                    key={complaint._id}
                    className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    {/* Header */}
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

                    {/* Body */}
                    <div className="grid md:grid-cols-2 gap-10 p-8">
                      <div className="space-y-4">
                        <div>
                          <p className="text-slate-500 text-sm">User</p>
                          <h3 className="font-semibold text-slate-800">
                            {complaint.user?.name}
                          </h3>
                        </div>

                        <div>
                          <p className="text-slate-500 text-sm">Email</p>
                          <h3 className="font-semibold text-slate-800">
                            {complaint.user?.email}
                          </h3>
                        </div>

                        <div>
                          <p className="text-slate-500 text-sm">Phone</p>
                          <h3 className="font-semibold text-slate-800">
                            {complaint.user?.phone}
                          </h3>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div>
                        <p className="text-slate-500 text-sm">
                          Complaint Description
                        </p>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mt-2 min-h-[120px] text-slate-700">
                          {complaint.comment}
                        </div>

                        {/* Assigned Agent */}
                        <div className="mt-5">
                          <p className="text-slate-500 text-sm">
                            Assigned Agent
                          </p>

                          {complaint.assignedAgent ? (
                            <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                              <h3 className="text-emerald-700 font-bold">
                                {complaint.assignedAgent.name}
                              </h3>
                              <p className="text-sm text-slate-600 mt-1">
                                This complaint has already been assigned.
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <div className="flex gap-4">
                                <select
                                  className="flex-1 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                  value={selectedAgents[complaint._id] || ""}
                                  onChange={(e) =>
                                    setSelectedAgents({
                                      ...selectedAgents,
                                      [complaint._id]: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Agent</option>
                                  {agents.map((agent) => (
                                    <option key={agent._id} value={agent._id}>
                                      {agent.name}
                                    </option>
                                  ))}
                                </select>

                                <button
                                  onClick={() => assignComplaint(complaint._id)}
                                  disabled={assigningId === complaint._id}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold transition disabled:opacity-60"
                                >
                                  {assigningId === complaint._id
                                    ? "Assigning..."
                                    : "Assign"}
                                </button>
                              </div>
                            </div>
                          )}
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

export default ComplaintInfo;
