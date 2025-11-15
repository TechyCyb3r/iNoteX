export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const API = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  GET_USER: `${BASE_URL}/auth/getuser`,
  UPDATE_NAME: `${BASE_URL}/auth/update-name`,
  UPDATE_EMAIL: `${BASE_URL}/auth/update-email`,
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password`,
  DELETE_ACCOUNT: `${BASE_URL}/auth/accdelete`,

  GET_NOTES: `${BASE_URL}/notes/fetchallnotes`,
  ADD_NOTE: `${BASE_URL}/notes/addnote`,
  UPDATE_NOTE: `${BASE_URL}/notes/updatenote`,
  DELETE_NOTE: `${BASE_URL}/notes/deletenote`,
};
