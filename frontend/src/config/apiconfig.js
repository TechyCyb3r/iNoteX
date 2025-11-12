export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// All endpoints centralized
export const API = {
  SIGNUP: `${API_BASE}/api/auth/signup`,
  LOGIN: `${API_BASE}/api/auth/login`,
  GET_USER: `${API_BASE}/api/auth/getuser`,
  UPDATE_NAME: `${API_BASE}/api/auth/update-name`,
  UPDATE_EMAIL: `${API_BASE}/api/auth/update-email`,
  UPDATE_PASSWORD: `${API_BASE}/api/auth/update-password`,
  DELETE_ACCOUNT: `${API_BASE}/api/auth/accdelete`,
  GET_NOTES: `${API_BASE}/api/notes/fetchallnotes`,
  ADD_NOTE: `${API_BASE}/api/notes/addnote`,
  DELETE_NOTE: `${API_BASE}/api/notes/deletenote`,
  UPDATE_NOTE: `${API_BASE}/api/notes/updatenote`,
};
