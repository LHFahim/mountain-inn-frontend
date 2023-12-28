import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading: isStaysLoading } = useQuery({
    queryFn: () =>
      getBookings({ filter: [{ field: "startDate", value: queryDate }] }),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.items?.filter(
    (stay) => stay.status === "CHECKED_IN" || stay.status === "CHECKED_OUT"
  );

  return { stays, isStaysLoading, confirmedStays };
};
