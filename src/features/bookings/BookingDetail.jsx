import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;

  const statusToTagName = {
    UNCONFIRMED: "blue",
    CHECKED_IN: "green",
    CHECKED_OUT: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("_", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "UNCONFIRMED" && (
          <Button onClick={() => navigate(`/check-in/${id}`)}>Check in</Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
