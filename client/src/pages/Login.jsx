import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  login,
  register,
} from "../services/api";

import "../styles/login.css";

export default function Login() {
  const [isLogin, setIsLogin] =
    useState(true);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { loginUser } =
    useAuth();

  const navigate =
    useNavigate();

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const validateForm =
    () => {
      if (
        !form.email ||
        !form.password
      ) {
        return "Email and password are required";
      }

      if (
        !isLogin &&
        !form.name
      ) {
        return "Name is required";
      }

      return "";
    };

  const handleSubmit =
    async () => {
      const validationError =
        validateForm();

      if (
        validationError
      ) {
        setError(
          validationError
        );

        return;
      }

      setError("");

      setLoading(true);

      try {
        console.log(
          isLogin
            ? "Logging in..."
            : "Registering..."
        );

        const res =
          isLogin
            ? await login({
                email:
                  form.email,
                password:
                  form.password,
              })
            : await register({
                name:
                  form.name,
                email:
                  form.email,
                password:
                  form.password,
              });

        console.log(
          "Auth Response:",
          res.data
        );

        const user =
          res.data.user;

        const token =
          res.data.token;

        if (
          !user ||
          !token
        ) {
          setError(
            "Invalid server response"
          );

          return;
        }

        loginUser(
          user,
          token
        );

        navigate(
          "/dashboard"
        );
      } catch (err) {
        console.error(
          "Auth Error:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleKeyDown = (
    e
  ) => {
    if (
      e.key === "Enter"
    ) {
      handleSubmit();
    }
  };

  return (
    <div className="login-page">
      <div
        className="login-brand"
        onClick={() =>
          navigate("/")
        }
        style={{
          cursor:
            "pointer",
        }}
      >
        <span className="login-brand-mark">
          &#9670;
        </span>

        NxtBuild
      </div>

      <div className="login-card">
        <h2 className="login-card-title">
          {isLogin
            ? "Welcome back"
            : "Create account"}
        </h2>

        <p className="login-card-subtitle">
          {isLogin
            ? "Sign in to your account"
            : "Start building for free"}
        </p>

        {error && (
          <div
            style={{
              color:
                "#dc2626",
              fontSize: 14,
              marginBottom: 16,
              padding:
                "10px 14px",
              background:
                "#fef2f2",
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        )}

        <div className="login-form">
          {!isLogin && (
            <div className="login-field">
              <label className="login-label">
                Full Name
              </label>

              <input
                className="login-input"
                name="name"
                placeholder="John Doe"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>
          )}

          <div className="login-field">
            <label className="login-label">
              Email
            </label>

            <input
              className="login-input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              onKeyDown={
                handleKeyDown
              }
            />
          </div>

          <div className="login-field">
            <label className="login-label">
              Password
            </label>

            <input
              className="login-input"
              name="password"
              type="password"
              placeholder="••••••••"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              onKeyDown={
                handleKeyDown
              }
            />
          </div>

          <button
            className="login-submit-btn"
            onClick={
              handleSubmit
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </div>

        <div className="login-toggle">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}

          <button
            className="login-toggle-btn"
            onClick={() => {
              setIsLogin(
                !isLogin
              );

              setError(
                ""
              );
            }}
          >
            {isLogin
              ? "Sign up"
              : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}