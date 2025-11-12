// src/config/apiconfig.js

// Get base URL from .env
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://i-note-x.vercel.app";

// ✅ All API endpoints centralized here
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
