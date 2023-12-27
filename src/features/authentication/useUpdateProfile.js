import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfileApi } from "../../services/apiAuth";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User has been updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateProfile, isUpdatingProfile };
}
