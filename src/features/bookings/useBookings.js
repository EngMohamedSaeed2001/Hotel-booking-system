import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();

  //Filter
  const FilterParam = searchParam.get("status");
  const filter =
    !FilterParam || FilterParam === "all"
      ? null
      : { field: "status", value: FilterParam };
  // : { field: "totalPrice", value: 5000, method: "gte" };

  // Sort
  const sortParam = searchParam.get("sortBy") || "startDate-asc";
  const [field, direction] = sortParam.split("-");
  const sortBy = { field, direction };

  // Pagination

  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { isLoading, bookings, count, error };
}
