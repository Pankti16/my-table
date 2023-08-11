import React from "react";
import { TableBodyProps } from "./TableBody.types";

import "./style.css";

import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import { isString } from "../../utils";

const TableBody: React.FC<TableBodyProps> = ({
  data,
  columns,
  isSelect,
  isMultiSelect,
  primaryColumn,
  selectedRows,
  customRowStyle,
  onSelectChange,
}) => {
  //Check whether custom row style is string or object
  const isRowStyleStr = isString(customRowStyle);

  return (
    <tbody>
      {/* Loop through data */}
      {data.map((items, index) => (
        <React.Fragment key={`row-${index}-empty`}>
          {/* Show row */}
          <tr
            key={`row-${index}`}
            className={`table-row ${
              selectedRows?.includes(items[primaryColumn ?? ''])
                ? "table-row-selected"
                : ""
            } ${isRowStyleStr ? customRowStyle : ""}`}
            style={!isRowStyleStr ? customRowStyle as React.CSSProperties : {}}
          >
            {/* Show column with select option */}
            {isSelect && (
              <td className="select-column">
                <span>
                  {isMultiSelect ? (
                    <Checkbox
                      checkId={"multiselect"}
                      checkName={"multiselect"}
                      checkValue={items[primaryColumn ?? '']}
                      isChecked={selectedRows?.includes(items[primaryColumn ?? ''])}
                      onChange={onSelectChange}
                    />
                  ) : (
                    <Radio
                      checkId={"singleselect"}
                      checkName={"singleselect"}
                      checkValue={items[primaryColumn ?? '']}
                      isChecked={selectedRows?.includes(items[primaryColumn ?? ''])}
                      onChange={onSelectChange}
                    />
                  )}
                </span>
              </td>
            )}
            {/* Loop through columns of each data row */}
            {columns?.map((itemKey, itemIndex) => (
              <td
                key={`${itemKey}-${index}-${itemIndex}`}
                className={`${!isSelect ? "cell-without-select" : ""}`}
              >
                {items[itemKey] ?? " - "}
              </td>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableBody;
