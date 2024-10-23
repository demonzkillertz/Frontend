import { createTaskGroup } from "@/service/taskgroup.service";
import { createTaskTemplate } from "@/service/tasktemplate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateTaskTemplate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => {
      return createTaskTemplate(payload);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["taskTemplate"] });
      navigate("/task-template");
    },
  });
};