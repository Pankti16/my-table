import React from "react";
import { MobileTableBodyProps } from "./MobileTableBody.types";

import "./style.scss";

import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import { isString } from "../../utils";
// Component to show table body in mobile view with more than 3 columns including select
const MobileTableBody: React.FC<MobileTableBodyProps> = ({
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
      {/* Loop through data to display label and value pair */}
      {data.map((items, index) => (
        <React.Fragment key={`row-${index}-empty`}>
          {/* Show row */}
          <tr
            key={`row-${index}`}
            className={`mobile-table-row ${
              selectedRows?.includes(items[primaryColumn ?? ''])
                ? "mobile-table-row-selected"
                : ""
            } ${isRowStyleStr ? customRowStyle : ""}`}
            style={!isRowStyleStr ? customRowStyle as React.CSSProperties : {}}
          >
            {/* Show column */}
            <td className={`${!isSelect ? "mobile-cell-without-select" : ""}`}>
              {/* Show cell with input (if select is true), label and value */}
              <span className={`mobile-table-body`}>
                {isSelect && (
                  <span className="left-span select-column">
                    {/* Show checkbox for multiselect or show radio */}
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
                )}
                {/* Show label value pair */}
                <span
                  className={`right-span ${isSelect ? "add-margin-top" : ""}`}
                >
                  {/* Loop through columns of each data row */}
                  {columns?.map((itemKey, itemIndex) => (
                    <span key={`${itemKey}-${index}-${itemIndex}`}>
                      <span className="my-label">{`${itemKey.replace(/-|_/g, ' ')}: `}</span>
                      <span className="my-value">
                        {items[itemKey] ?? " - "}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default MobileTableBody;
