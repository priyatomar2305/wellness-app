import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import toast,{ Toaster } from "react-hot-toast";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sessions" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-sessions"
            element={
              <PrivateRoute>
                <MySessions />
              </PrivateRoute>
            }
          />
          <Route
            path="/session-editor"
            element={
              <PrivateRoute>
                <SessionEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="/session-editor/:id"
            element={
              <PrivateRoute>
                <SessionEditor />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
