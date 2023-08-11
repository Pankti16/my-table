import React from "react";
import { MobileTableHeaderProps } from "./MobileTableHeader.types";
import "./style.scss";

import Checkbox from "../Checkbox/Checkbox";

import { isString } from "../../utils";

// Component to show table body in mobile view with more than 3 columns including select
const MobileTableHeader: React.FC<MobileTableHeaderProps> = ({
  mobileHeader = "",
  isSelect,
  isMultiSelect,
  isAllSelected = false,
  customHeaderStyle,
  onSelectChange,
}) => {
  //Check whether custom header row style is string or object
  const isHeaderStyleStr = isString(customHeaderStyle);

  return (
    <thead>
      {/* Show row */}
      <tr
        className={`${isHeaderStyleStr ? customHeaderStyle : ""}`}
        style={!isHeaderStyleStr ? customHeaderStyle as React.CSSProperties : {}}
      >
        {/* Show header column with input and heading title (if given) */}
        <th>
          <span className={`mobile-table-header`}>
            {isSelect && (
              <span className="left-span select-column">
                {isMultiSelect && (
                  <Checkbox
                    checkId={"multiselect"}
                    checkName={"multiselect"}
                    checkValue={"All"}
                    onChange={onSelectChange}
                    isChecked={isAllSelected}
                  />
                )}
              </span>
            )}
            <span className="right-span">{mobileHeader}</span>
          </span>
        </th>
      </tr>
    </thead>
  );
};

export default MobileTableHeader;
