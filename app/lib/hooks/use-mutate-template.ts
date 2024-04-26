import { templateService } from "@/service/template.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useSaveTemplate = () => {
//   const mutate = useMutation({
//     mutationKey: ["savetemplate"],
//     mutationFn: () => templateService.saveTemplate(request),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["templates"] });
//     },
//   });

  return useMutation(templateService.saveTemplate as any);;
};

export default useSaveTemplate;
