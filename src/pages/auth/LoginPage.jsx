import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await loginApi(data);

      login(
        response.accessToken,

        response.refreshToken,
      );

      toast.success("Login Successful");

      navigate("/");
    } catch {
      toast.error("Invalid Email or Password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Library Management</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <p className="error">{errors.password?.message}</p>
          </div>

          <button className="login-btn" disabled={isSubmitting}>
            Login
          </button>
        </form>
        <div className="register-link">

    Don't have an account?

    <Link to="/register">

        Register

    </Link>

</div>
      </div>
    </div>
  );
}
