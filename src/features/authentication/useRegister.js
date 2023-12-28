import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../../services/apiAuth";

export const useRegister = () => {
  const { mutate: register, isLoading: isRegistering } = useMutation({
    mutationFn: registerUser,

    onSuccess: (user) => {
      toast.success("Account has been successfully created!");
    },
  });

  return { register, isRegistering };
};
