import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const success = await login(formData.email, formData.password);

    if (success) {
      navigate("/");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>

        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        <div className="password-box">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🫣" : "👁"}
  </span>
</div>
        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;