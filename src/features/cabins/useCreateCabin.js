import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createOrEditCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin has been created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
