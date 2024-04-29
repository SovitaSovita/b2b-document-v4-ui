import {
  GetUsersRequest,
  UserListResponse,
  userService,
} from "@/service/userinfo.service";
import { useQuery } from "@tanstack/react-query";

const useFetchUsers = ({ page, size, sort }: GetUsersRequest) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUsers({ page, size, sort }),
  });

  return {
    isLoading: query?.isLoading,
    isError: query?.isError,
    users: query?.data,
  };
};

export default useFetchUsers;
