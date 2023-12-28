import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from "react";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const DashboardLayout = () => {
  const { recentBookings, isRecentBookingLoading } = useRecentBookings();
  const { stays, isStaysLoading, confirmedStays } = useRecentStays();

  if (isRecentBookingLoading || isStaysLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings.items}
        confirmedStays={confirmedStays}
      />
      <div>todays activity</div>
      <div>chart stay duration</div>
      <div>chart of sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
