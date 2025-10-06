import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sort({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentParam = searchParam.get("sortBy") || "";
  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      type={"white"}
      value={currentParam}
    />
  );
}

export default Sort;
