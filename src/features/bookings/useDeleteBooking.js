import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking has been deleted successfully`);

      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Booking couldn't be deleted");
    },
  });

  return { deleteBooking, isDeleting };
}
