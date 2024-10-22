import axios from "axios";

axios.defaults.withCredentials = true;
const backendURI = import.meta.env.VITE_BACKEND_URI;

export const fetchTaskTemplate = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  const response = await axios.get(`${backendURI}/task-template`);
  return response.data;
};

export const createTaskTemplate = async (payload: any) => {
  const response = await axios.post(`${backendURI}/task-template`, payload);
  return response.data;
};
export const editTaskTemplate = async ({
  payload,
  id,
}: {
  payload: any;
  id: string;
}) => {
  const response = await axios.put(
    `${backendURI}/task-template/${id}`,
    payload
  );
  return response.data;
};
