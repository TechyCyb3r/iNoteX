// src/config/apiconfig.js

// Read base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("🔧 Loaded BASE_URL:", BASE_URL); // Debugging line

// If BASE_URL is missing, throw error (optional)
if (!BASE_URL) {
  throw new Error("❌ BASE_URL is missing! Check your .env file.");
}

export const API = {
  // Auth routes
  SIGNUP: `${BASE_URL}/api/auth/signup`,
  LOGIN: `${BASE_URL}/api/auth/login`,
  GET_USER: `${BASE_URL}/api/auth/getuser`,
  UPDATE_NAME: `${BASE_URL}/api/auth/update-name`,
  UPDATE_EMAIL: `${BASE_URL}/api/auth/update-email`,
  UPDATE_PASSWORD: `${BASE_URL}/api/auth/update-password`,
  DELETE_ACCOUNT: `${BASE_URL}/api/auth/accdelete`,

  // Notes routes
  GET_NOTES: `${BASE_URL}/api/notes/fetchallnotes`,
  ADD_NOTE: `${BASE_URL}/api/notes/addnote`,
  UPDATE_NOTE: `${BASE_URL}/api/notes/updatenote`,
  DELETE_NOTE: `${BASE_URL}/api/notes/deletenote`,
};
