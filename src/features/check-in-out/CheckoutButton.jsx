import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";
function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckout } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
