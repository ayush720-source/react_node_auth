import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import { useEffect } from "react";

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/admin-login");
        }
    }, []);
    return (
        <div className="conatiner-fluid">
            <div className="row d-flex flex-column justify-content-center text-center align-items-center w-100" style={{ height: '100vh' }}>
                <div className="col-lg-5 col-12 d-flex flex-column">
                    <h2 className="mb-5" style={{ textTransform: 'uppercase' }}>Welcome to Admin Dashboard</h2>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
