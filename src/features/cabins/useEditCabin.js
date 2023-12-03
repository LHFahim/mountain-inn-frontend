import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createOrEditCabin(newCabin, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin has been edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
