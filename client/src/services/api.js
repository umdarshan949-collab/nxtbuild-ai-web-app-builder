import axios from "axios";

import Cookies from "js-cookie";

const api = axios.create({
  baseURL:
    "https://nxtbuild-ai-web-app-builder-backend.onrender.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);

api.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    console.error(
      "API Error:",
      error?.response ||
        error
    );

    if (
      error?.response
        ?.status === 401
    ) {
      Cookies.remove(
        "token"
      );

      Cookies.remove(
        "user"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export const register = (
  data
) =>
  api.post(
    "/auth/register",
    data
  );

export const login = (
  data
) =>
  api.post(
    "/auth/login",
    data
  );

export const getProjects =
  () =>
    api.get("/projects");

export const createProject = (
  data
) =>
  api.post(
    "/projects",
    data
  );

export const getProject = (
  id
) =>
  api.get(
    `/projects/${id}`
  );

export const updateProject = (
  id,
  data
) =>
  api.put(
    `/projects/${id}`,
    data
  );

export const deleteProject = (
  id
) =>
  api.delete(
    `/projects/${id}`
  );

export const generateCode = (
  data
) =>
  api.post(
    "/generate",
    data
  );

export default api;