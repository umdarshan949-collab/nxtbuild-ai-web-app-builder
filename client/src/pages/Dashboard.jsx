import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/api";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects =
    async () => {
      try {
        const res =
          await getProjects();

        setProjects(
          res.data.projects || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  const handleNewProject =
    async () => {
      try {
        const res =
          await createProject({
            title:
              "New Project",
          });

        navigate(
          `/builder/${res.data.project._id}`
        );
      } catch (err) {
        console.error(err);
      }
    };

  const handleDelete =
    async (e, id) => {
      e.stopPropagation();

      if (
        !confirm(
          "Delete this project?"
        )
      )
        return;

      try {
        await deleteProject(id);

        setProjects(
          projects.filter(
            (p) => p._id !== id
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

  const formatDate = (
    date
  ) =>
    new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        background:
          "#f8f7ff",
      }}
    >
      <Navbar />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              My Projects
            </h1>

            <p className="dashboard-subtitle">
              Welcome back,{" "}
              {user?.name} 👋
            </p>
          </div>

          {projects.length >
            0 && (
            <button
              className="dashboard-new-btn"
              onClick={
                handleNewProject
              }
            >
              + New Project
            </button>
          )}
        </div>

        {loading ? (
          <div
            style={{
              textAlign:
                "center",

              padding: 80,

              color:
                "#8b8ba3",
            }}
          >
            Loading...
          </div>
        ) : projects.length ===
          0 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">
              ⬡
            </div>

            <h2 className="dashboard-empty-title">
              No projects yet
            </h2>

            <p className="dashboard-empty-subtitle">
              Create your first
              AI-powered web app
            </p>

            <button
              className="dashboard-new-btn"
              onClick={
                handleNewProject
              }
            >
              + New Project
            </button>
          </div>
        ) : (
          <div className="dashboard-grid">
            {projects.map(
              (project) => (
                <div
                  key={
                    project._id
                  }
                  className="project-card"
                  onClick={() =>
                    navigate(
                      `/builder/${project._id}`
                    )
                  }
                  style={{
                    cursor:
                      "pointer",
                  }}
                >
                  <div className="project-card-preview">
                    {project.code ? (
                      <iframe
                        className="project-card-iframe"
                        srcDoc={
                          project.code
                        }
                        title={
                          project.title
                        }
                        sandbox="allow-scripts"
                        style={{
                          transform:
                            "scale(0.5)",

                          transformOrigin:
                            "top left",
                        }}
                      />
                    ) : (
                      <div className="project-card-empty-preview">
                        No preview
                        yet
                      </div>
                    )}
                  </div>

                  <div className="project-card-info">
                    <div className="project-card-title">
                      {
                        project.title
                      }
                    </div>

                    <div className="project-card-date">
                      {formatDate(
                        project.updatedAt ||
                          project.createdAt
                      )}
                    </div>
                  </div>

                  <div className="project-card-actions">
                    <button
                      className="project-card-delete"
                      onClick={(
                        e
                      ) =>
                        handleDelete(
                          e,
                          project._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}