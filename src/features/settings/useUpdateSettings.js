import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettingsApi } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, settings }) => updateSettingsApi(id, settings),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings have been updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
}
