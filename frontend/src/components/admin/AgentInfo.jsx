import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import api from "../../services/api";

function AgentInfo() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data.agents || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <FaUserTie size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Complaint Agents
            </h1>
            <p className="text-slate-500 mt-1">
              View all registered complaint agents.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 h-56"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {agents.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center text-slate-500 text-lg">
                No Agents Found
              </div>
            ) : (
              agents.map((agent) => (
                <div
                  key={agent._id}
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition p-6"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-emerald-600 truncate">
                        {agent.name}
                      </h2>
                      <p className="text-slate-400 text-xs mt-1 font-mono break-all">
                        {agent._id}
                      </p>
                    </div>

                    <span className="shrink-0 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                      Agent
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-slate-500 text-sm">Email</p>
                      <h3 className="font-semibold text-slate-800 break-all">
                        {agent.email}
                      </h3>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm">Phone</p>
                      <h3 className="font-semibold text-slate-800">
                        {agent.phone}
                      </h3>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm">Joined On</p>
                      <h3 className="font-semibold text-slate-800">
                        {new Date(agent.createdAt).toLocaleDateString()}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentInfo;
