import { userService } from "@/service/userinfo.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchUserInfo = ({ userId }: { userId: string }) => {
  const query = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => userService.getUserInfo(userId),
  });

  return {
    isLoading: query?.isLoading,
    isError: query?.isError,
    users: query?.data ?? [],
  };
};

export default useFetchUserInfo;
 