import React from "react";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={`discount`}
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "Discounted", value: "discounted" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
