import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettingsHook";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { isLoading, booking } = useBooking();
  const { isChecking, checkIn } = useCheckIn();
  const { isLoading: isLoadSettings, data: settings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const totalBreakfast =
    Number(settings.breakfastPrice) * Number(numGuests) * Number(numNights);

  function handleBreakfast() {
    setBreakfast((breakfast) => !breakfast);
    setConfirmPaid(false);
  }

  function handleCheckin() {
    if (!confirmPaid) return;

    if (breakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: breakfast,
          extrasPrice: totalBreakfast,
          totalPrice: totalBreakfast + totalPrice,
        },
      });
    } else checkIn({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={breakfast}
            //disabled={confirmPaid || isChecking}
            onChange={handleBreakfast}
          >
            Do You want to add breakfast for
            {formatCurrency(totalBreakfast)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isChecking}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {breakfast
            ? `${formatCurrency(totalPrice + totalBreakfast)}
              
              (${formatCurrency(totalPrice)} + ${formatCurrency(
                totalBreakfast
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
