import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // NOTE: FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? ""
      : { field: "status", value: filterValue };

  // NOTE: SORT
  let sortByValue = searchParams.get("sortBy");
  if (!sortByValue) {
    sortByValue = "startDate-desc";
  }
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  // NOTE: PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // NOTE: QUERY
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // NOTE: PRE-FETCHING
  if (!isLoading) {
    const pageCount = Math.ceil(bookings.pagination.total / PAGE_SIZE);
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
  }

  return { isLoading, error, bookings };
}
