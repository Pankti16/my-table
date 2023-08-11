import React from "react";

export interface TableBodyProps {
    /**
     * What data should be displayed in the cells
     */
    data: Array<any>,
    /**
     * What are the columns for the table?
     */
    columns: Array<string>,
    /**
     * Is it the selectable table?
     */
    isSelect?: boolean,
    /**
     * Is it multiselect(checkbox) or singleselect(radio)
     */
    isMultiSelect?: boolean,
    /**
     * What is the primary column for selection purpose (will be used as the value for checkbox/radio)
     */
    primaryColumn?: string | number,
    /**
     * Which rows are selected?
     */
    selectedRows?: Array<string | number>,
    /**
     * Pass any custom style or class name for the row
     */
    customRowStyle?: string | React.CSSProperties,
    /**
     * Click handler for checkbox/radio change
     */
    onSelectChange?: (val: string | number) => void,
  }