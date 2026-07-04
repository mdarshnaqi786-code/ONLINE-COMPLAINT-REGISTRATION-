import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";
import api from "../../services/api";

const initialForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  comment: "",
};

function Complaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/complaints", form);
      alert(res.data.message);
      navigate("/user/status");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit complaint"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/user/home"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition"
        >
          <FaArrowLeft size={14} />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
              <FaClipboardList size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Register a Complaint
              </h1>
              <p className="text-slate-500 mt-1">
                Fill in the details below and we'll route it to the right
                department.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mt-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Complaint Title
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Streetlight not working"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Building / street / landmark"
                value={form.address}
                onChange={handleChange}
                rows="2"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                pattern="[0-9]{4,6}"
                title="Enter a valid pincode"
                className="w-full md:w-1/2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Complaint Description
              </label>
              <textarea
                name="comment"
                placeholder="Describe the issue in detail..."
                value={form.comment}
                onChange={handleChange}
                rows="5"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Complaint;
