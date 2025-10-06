import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabinHook";
import { HiDuplicate, HiPencil, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabinHook";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    discount,
    regularPrice,
    description,
  } = cabin;

  const { isLoading, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      description,
      discount,
      image,
      maxCapacity,
      name: `Copy of ${name}`,
      regularPrice,
    });
  }
  return (
    <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Modal.Open
              opens="editCabin"
              renderButton={(openFunc) => (
                <Menus.Button icon={<HiPencil />} onClick={openFunc}>
                  {" "}
                  Edit
                </Menus.Button>
              )}
            />

            <Modal.Window
              name="editCabin"
              renderClose={(closeFunc) => (
                <CreateCabinForm onClose={closeFunc} editCabin={cabin} />
              )}
            />

            <Modal.Open
              opens="deleteCabin"
              renderButton={(openFunc) => (
                <Menus.Button icon={<HiTrash />} onClick={openFunc}>
                  {" "}
                  Delete
                </Menus.Button>
              )}
            />
            <Modal.Window
              name="deleteCabin"
              renderClose={(closeFunc) => (
                <ConfirmDelete
                  resource={`Cabin ${name}`}
                  onConfirm={() => {
                    deleteCabin(cabinId);
                  }}
                  onClose={closeFunc}
                  disabled={isLoading}
                />
              )}
            />

            <Menus.Button icon={<HiDuplicate />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
