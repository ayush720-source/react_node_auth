import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "./utils/auth";

const AdminProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/admin-login" />;
};

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer-register" element={<CustomerRegister />} />
                <Route path="/admin-register" element={<AdminRegister />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminProtectedRoute element={<AdminDashboard />} />} />
            </Routes>
        </Router>
    );
}

export default App;
