import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Builder from "./pages/Builder";

/* ================= LOADER ================= */

function FullPageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background: "#f8f7ff",

        color: "#6b7280",

        fontSize: "16px",

        fontWeight: "600",
      }}
    >
      Loading...
    </div>
  );
}

/* ================= PRIVATE ROUTE ================= */

function PrivateRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <FullPageLoader />
    );
  }

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}

/* ================= PUBLIC ROUTE ================= */

function PublicRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <FullPageLoader />
    );
  }

  return user ? (
    <Navigate
      to="/dashboard"
      replace
    />
  ) : (
    children
  );
}

/* ================= APP ================= */

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landing />
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/builder/:id"
            element={
              <PrivateRoute>
                <Builder />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}