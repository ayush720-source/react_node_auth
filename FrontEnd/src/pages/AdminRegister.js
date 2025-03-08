import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First Name is required.";
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last Name is required.";
        }
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                ...formData,
                role: "admin"
            });

            toast.success(response.data.message || "Registration successful Please Check your email.");
            setFormData({ first_name: "", last_name: "", email: "", password: "" });
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-center">
                    <form onSubmit={handleSubmit} className="w-100">
                        <h3 className="text-center mb-5" style={{ textTransform: 'uppercase' }}>Admin Registration form</h3>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                placeholder="First Name"
                            />
                            {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
                        </div>

                        <div className="form-group my-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                placeholder="Last Name"
                            />
                            {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
                        </div>

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
    );
};

export default AdminRegister;
