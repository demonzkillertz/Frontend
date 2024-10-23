import axios from "axios";

axios.defaults.withCredentials = true;
const backendURI = import.meta.env.VITE_BACKEND_URI;

export const fetchTaskGroup = async () => {
  const response = await axios.get(`${backendURI}/task-groups`);
  return response.data;
};

export const fetchTaskGroupById = async ({ id }: { id: string }) => {
  const response = await axios.get(`${backendURI}/task-group/${id}`);
  return response.data;
};


export const createTaskGroup = async (payload: any) => {
  const response = await axios.post(`${backendURI}/task-groups`, payload);
  return response.data;
};
export const editTaskGroup = async ({
  payload,
  id,
}: {
  payload: any;
  id: string;
}) => {
  const response = await axios.patch(`${backendURI}/task-group/${id}`, payload);
  return response.data;
};
