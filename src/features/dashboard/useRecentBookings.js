import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isRecentBookingLoading } = useQuery({
    queryFn: () =>
      getBookings({ filter: [{ field: "startDate", value: queryDate }] }),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { recentBookings, isRecentBookingLoading };
};
