import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from "react";
import { useCabins } from "../cabins/useCabins";
import { DurationChart } from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const DashboardLayout = () => {
  const { recentBookings, isRecentBookingLoading } = useRecentBookings();
  const { stays, isStaysLoading, confirmedStays, numDays } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isRecentBookingLoading || isStaysLoading || isLoading3)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings.items}
        confirmedStays={confirmedStays}
      />
      <div>todays activity</div>
      <DurationChart confirmedStays={confirmedStays} stays={stays.items} />
      <SalesChart recentBookings={recentBookings.items} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
