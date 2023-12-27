import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: ({ bookingId }) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking has been deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Cannot delete this Booking");
    },
  });

  return { isDeleting, deleteBooking };
}
