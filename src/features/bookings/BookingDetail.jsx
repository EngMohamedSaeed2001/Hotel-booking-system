import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const { status, id: bookingId } = booking || {};

  const moveBack = useMoveBack();

  const { isCheckout, checkOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckout() {
    checkOut(bookingId);
  }

  function handleDelete() {
    deleteBooking(bookingId, {
      onSettled: () => navigate(-1),
    });
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckout}
              onClick={handleCheckout}
            >
              Check out
            </Button>
          )}

          <Modal.Open
            opens={"deleteBooking"}
            renderButton={(openFun) => (
              <Button
                variation="danger"
                icon={<HiTrash />}
                onClick={() => {
                  openFun();
                }}
              >
                Delete
              </Button>
            )}
          />
          <Modal.Window
            name={"deleteBooking"}
            renderClose={(closeFunc) => (
              <ConfirmDelete
                resource={`Booking ${bookingId}`}
                onConfirm={() => {
                  handleDelete(bookingId);
                }}
                onClose={closeFunc}
                disabled={isDeleting}
              />
            )}
          />

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
