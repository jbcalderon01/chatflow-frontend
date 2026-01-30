import { useQuery } from "@tanstack/react-query";
import { ProjectsService } from "../../services";
import { queryKeys } from "@/shared/consts";

export const useGetProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => ProjectsService.getProjects(),
  });
  return { data, isLoading, error };
};
