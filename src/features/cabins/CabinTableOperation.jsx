import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function CabinTableOperation() {
  return (
    <div>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort name A-Z" },
          { value: "name-dsc", label: "Sort name Z-A" },
          { value: "regularPrice-asc", label: "Sort price (low-high)" },
          { value: "regularPrice-dsc", label: "Sort price (high-low)" },
          { value: "maxCapacity-asc", label: "Sort capacity (low-high)" },
          { value: "maxCapacity-dsc", label: "Sort capacity (high-low)" },
        ]}
      />
    </div>
  );
}

export default CabinTableOperation;
