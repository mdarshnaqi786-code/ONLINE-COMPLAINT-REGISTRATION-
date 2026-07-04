import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common Components
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import ProtectedRoute from "./components/common/ProtectedRoute";

// User Components
import HomePage from "./components/user/HomePage";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";
import EditComplaint from "./components/user/EditComplaint";

// Admin Components
import AdminHome from "./components/admin/AdminHome";
import UserInfo from "./components/admin/UserInfo";
import AgentInfo from "./components/admin/AgentInfo";
import ComplaintInfo from "./components/admin/ComplaintInfo";

// Agent Components
import AgentHome from "./components/agent/AgentHome";
import AgentComplaints from "./components/agent/AgentComplaints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Routes */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/complaint"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/status"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <EditComplaint />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/agents"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AgentInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ComplaintInfo />
            </ProtectedRoute>
          }
        />

        {/* Agent Routes */}
        <Route
          path="/agent/home"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <AgentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/complaints"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <AgentComplaints />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
