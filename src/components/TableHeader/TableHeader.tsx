import React from "react";
import { RenderColumnNameAndIconProps, TableHeaderProps } from "./TableHeader.types";
import "./style.css";

import Checkbox from "../Checkbox/Checkbox";
import SortIcon from "../SortIcon/SortIcon";
// Get sort-order enum/object/interface
import { SortOrder } from "../../constants/interfaces";
import { isString } from "../../utils";

//Component to show column name/label/accessor with the sorting icon
const RenderColumnNameAndIcon: React.FC<RenderColumnNameAndIconProps> = ({
  column,
  index,
  sortKey,
  sortType,
  sortableColumns,
  sortableExcept,
  onSortIconClick,
}) => {
  return (
    <div>
    {/* Show label/column name */}
      <span>{column.replace(/-|_/g, ' ')}</span>
      {/* If show all column is enable and this column is not in exception then show sort icon
        * Else if this column is in show column list then show sort icon (exception will not be considered if show column is array)
       */}
      {((sortableColumns === -1 &&
        (sortableExcept?.length === 0 ||
          !sortableExcept ||
          !sortableExcept?.includes(index))) ||
        (sortableColumns !== -1 && Array.isArray(sortableColumns) && sortableColumns?.includes(index))) && (
        <SortIcon {...{ column, sortKey, onSortIconClick }} type={sortType} />
      )}
    </div>
  );
};

//Component to show table header
const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  isSelect,
  isMultiSelect,
  sortableColumns,
  sortableExcept,
  sortKey,
  sortType = SortOrder.NONE,
  isAllSelected = false,
  customHeaderStyle,
  onSortIconClick,
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
      {/* Show input if multiselect */}
        {isSelect && (
          <th className="select-column">
            <span>
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
          </th>
        )}
        {/* Loop through columns of each data row */}
        {columns?.map((column, index) => (
          <th
            key={`header-${column.toLowerCase()}-${index}`}
            className={`header-column-name ${
              !isSelect ? "header-without-select" : ""
            }`}
            onClick={() => {
              // Do not call parent sorting method either
              // - Sortable column is all, and this column is in exception
              // - Sortable column is Array<any>, and this column is not in it
              if (
                !sortableColumns ||
                (sortableColumns !== -1 && Array.isArray(sortableColumns) && !sortableColumns?.includes(index)) ||
                (sortableColumns === -1 && sortableExcept?.includes(index))
              )
                return;
                onSortIconClick && onSortIconClick(column);
            }}
          >
          {/* Show component for name and sorting icon */}
            <span className="header-inline-flex">
              {
                <RenderColumnNameAndIcon
                  {...{
                    column,
                    index,
                    sortableColumns,
                    sortKey,
                    sortType,
                    sortableExcept,
                    onSortIconClick,
                  }}
                />
              }
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
