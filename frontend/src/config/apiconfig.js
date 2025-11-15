export const API = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  SIGNUP: `${BASE_URL}/api/auth/signup`,
  GET_USER: `${BASE_URL}/api/auth/getuser`,
  UPDATE_NAME: `${BASE_URL}/api/auth/update-name`,
  UPDATE_EMAIL: `${BASE_URL}/api/auth/update-email`,
  UPDATE_PASSWORD: `${BASE_URL}/api/auth/update-password`,
  DELETE_ACCOUNT: `${BASE_URL}/api/auth/accdelete`,

  GET_NOTES: `${BASE_URL}/api/notes/fetchallnotes`,
  ADD_NOTE: `${BASE_URL}/api/notes/addnote`,
  UPDATE_NOTE: `${BASE_URL}/api/notes/updatenote`,
  DELETE_NOTE: `${BASE_URL}/api/notes/deletenote`,
};
