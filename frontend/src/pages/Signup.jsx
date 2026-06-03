import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await signup(formData.name, formData.email, formData.password);
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <button type="submit">Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;