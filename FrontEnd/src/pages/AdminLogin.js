import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin-login`, formData);
            toast.success(response.data.message || "Login successful");
            localStorage.setItem("token", response.data.token);
            window.location.href = "/admin-dashboard";
        } catch (error) {
            toast.error(error.response?.data?.error || "Invalid credentials or access denied");
        }
    };

    const goBack = () => {
        window.location.href = "/";
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-center">
                        <form onSubmit={handleSubmit} className="w-100">
                            <h3 className="text-center mb-4" style={{ textTransform: 'uppercase' }}>Login Form</h3>

                            <div className="form-group my-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email"
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>

                            <div className="form-group my-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Password"
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>{" "}
                            &nbsp;&nbsp;
                            <button type="button" className="btn btn-danger" onClick={goBack}>
                                Back
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
