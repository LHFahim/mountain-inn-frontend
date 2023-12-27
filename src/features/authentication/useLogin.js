import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      if (user) {
        queryClient.setQueriesData(["user"], user);

        localStorage.setItem("access_token", user.access_token);

        navigate("/dashboard");
      }
      if (!user) {
        toast.error("Provided email or password is incorrect");
      }
    },

    onError: (err) => {},
  });

  return { login, isLogging };
};
