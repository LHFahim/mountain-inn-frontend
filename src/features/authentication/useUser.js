import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../services/apiAuth";

export const useUser = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });

  return { user, isLoadingUser, isAuthenticated: user ? true : false };
};
