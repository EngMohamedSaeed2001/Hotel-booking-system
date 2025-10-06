import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="cabinForm"
          renderButton={(openFunc) => (
            <Button onClick={openFunc}>Add new cabin</Button>
          )}
        />

        <Modal.Window
          name="cabinForm"
          renderClose={(closeFunc) => <CreateCabinForm onClose={closeFunc} />}
        />
      </Modal>
    </div>
  );
}

export default AddCabin;
