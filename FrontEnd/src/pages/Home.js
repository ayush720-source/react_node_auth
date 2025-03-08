import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/admin-dashboard");
        }
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
                    <div className="col-lg-5 col-sm-12 d-flex flex-column alilgn-items-center">
                        <h2 style={{ textTransform: 'uppercase' }}>
                            Welcome to Our Authentication System
                        </h2>
                        <strong className="py-3">Select an option below:</strong>

                        <Link to="/customer-register"><button className="btn btn-primary w-100">Customer Registration</button></Link>
                        <Link to="/admin-register"><button className="btn btn-primary my-3 w-100">Admin Registration</button></Link>
                        <Link to="/admin-login"><button className="btn btn-primary w-100">Admin Login</button></Link>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
