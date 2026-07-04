import { Navigate } from "react-router-dom";

// Wrap any dashboard route with this to make sure only a logged-in user
// with the right role can see it, e.g.:
//   <Route path="/admin/home" element={
//     <ProtectedRoute allowedRoles={["Admin"]}><AdminHome /></ProtectedRoute>
//   } />
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in, but not allowed here — send them back to their own home
    const fallback =
      user.role === "Admin"
        ? "/admin/home"
        : user.role === "Agent"
        ? "/agent/home"
        : "/user/home";

    return <Navigate to={fallback} replace />;
  }

  return children;
}

export default ProtectedRoute;
