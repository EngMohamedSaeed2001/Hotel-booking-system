import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const { isLoading, data: booking } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["bookings", bookingId],
    retry: false,
  });
  return { booking, isLoading };
}
