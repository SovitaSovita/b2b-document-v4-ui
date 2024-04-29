import { documentService } from "@/service/document.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchDocuments = (request: any) => {
    
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentService.getDocuments(request),
  });

  return {
    isLoading: query?.isLoading,
    isError: query?.isError,
    users: query?.data ?? [],
  };
};

export default useFetchDocuments;
