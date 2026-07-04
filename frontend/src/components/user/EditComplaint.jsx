import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import api from "../../services/api";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        const complaint = res.data.complaint;

        if (complaint.status !== "Pending") {
          setError(
            "This complaint is already being processed and can no longer be edited."
          );
        } else {
          setForm(complaint);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Couldn't load this complaint."
        );
      }
      setFetching(false);
    };

    fetchComplaint();
  }, [id]);

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
      await api.put(`/complaints/${id}`, {
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        comment: form.comment,
      });

      alert("Complaint Updated Successfully");
      navigate("/user/status");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update complaint"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/user/status"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition"
        >
          <FaArrowLeft size={14} />
          Back to My Complaints
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
              <FaPen size={22} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Edit Complaint
              </h1>
              <p className="text-slate-500 mt-1">
                Update your complaint details below.
              </p>
            </div>
          </div>

          {fetching ? (
            <div className="mt-8 space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl" />
              ))}
            </div>
          ) : error && form.name === "" ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mt-8">
              {error}
              <div className="mt-4">
                <Link
                  to="/user/status"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Back to My Complaints
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Complaint Title
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Complaint Title"
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
                  placeholder="Address"
                  rows="2"
                  value={form.address}
                  onChange={handleChange}
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
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                  className="w-full md:w-1/2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Complaint Description
                </label>
                <textarea
                  name="comment"
                  placeholder="Complaint Description"
                  rows="5"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Complaint"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditComplaint;
