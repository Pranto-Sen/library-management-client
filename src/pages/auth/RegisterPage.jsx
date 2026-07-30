import "./Register.css";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { register as registerUser } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    watch,

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm();

  async function onSubmit(data) {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      });

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.Message ||
        error.response?.data?.title ||
        error.response?.data?.errors?.[0] ||
        "Registration failed. Please try again.";

      toast.error(message);
    }
  }
  // async function onSubmit(data) {

  //     try {

  //         await registerUser({

  //             fullName: data.fullName,

  //             email: data.email,

  //             password: data.password,

  //             phone: data.phone,

  //             address: data.address

  //         });

  //         toast.success("Registration Successful");

  //         navigate("/login");

  //     }

  //     catch {

  //         toast.error("Registration Failed");

  //     }

  // }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        <p>Register as Library Member</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Full Name"
            {...register("fullName", {
              required: "Full Name is required",
            })}
          />

          <p>{errors.fullName?.message}</p>

          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p>{errors.email?.message}</p>

          <input
            placeholder="Phone"
            {...register("phone", {
              required: "Phone is required",
            })}
          />

          <p>{errors.phone?.message}</p>

          <textarea
            placeholder="Address"
            rows="3"
            {...register("address", {
              required: "Address is required",
            })}
          />

          <p>{errors.address?.message}</p>

          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",

              minLength: {
                value: 6,

                message: "Minimum 6 characters",
              },
            })}
          />

          <p>{errors.password?.message}</p>

          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />

          <p>{errors.confirmPassword?.message}</p>

          <button className="register-btn" disabled={isSubmitting}>
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
