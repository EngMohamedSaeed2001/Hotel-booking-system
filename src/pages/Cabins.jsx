import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Row from "../ui/Row";

function Cabins() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShow(!show)}>Add new cabin</Button>

        {show && <CreateCabinForm setShow={setShow} />}
      </Row>
    </>
  );
}

export default Cabins;
