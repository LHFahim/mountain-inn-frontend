import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "CHECKED_OUT",
      }),

    onSuccess: (data) => {
      console.log("🚀 ~ data.id:", data.id);
      toast.success(`Booking #${data.id} successfully checked out`);

      queryClient.invalidateQueries({
        active: true,
      });
    },

    onError: () => toast.error(`There was an error while checking out`),
  });

  return { checkout, isCheckingOut };
};
