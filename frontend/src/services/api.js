const API_BASE = "http://localhost:8080/api";

function getAuthHeaders() {
  const token = localStorage.getItem("jwt_token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  const data = await res.json();
  localStorage.setItem("jwt_token", data.token);
  return data;
}

export async function registerUser(username, email, password, confirmPassword) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }
  return res.json();
}

export async function uploadVideo(file) {
  const token = localStorage.getItem("jwt_token");
  const formData = new FormData();
  formData.append("video", file);
  const res = await fetch(`${API_BASE}/detection/upload`, {
    method: "POST",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function getVideoResults(id) {
  const res = await fetch(`${API_BASE}/detection/status/${id}`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}

export async function getUserVideos() {
  const res = await fetch(`${API_BASE}/videos`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

export function logout() {
  localStorage.removeItem("jwt_token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("jwt_token");
}
