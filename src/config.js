export function getApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return raw.replace(/\/+$/, "");
}

