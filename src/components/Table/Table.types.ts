import React from "react";
import { ThemeProps } from "../../constants/interfaces";

export interface TablePropType {
  /**
   * id for input, same value will be used for htmlFor of the label
   */
  dataSource: Array<any>,
  /**
   * Which columns should be sortable (-1 means all and array of number for specific columns)?
   */
  sortableColumns?: number | Array<number>,
  /**
   * Which columns should not be sortable when all columns are sortable
   */
  sortableExcept?: Array<number>,
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
   * Pass header for mobile table
   */
  mobileHeader?: string,
  /**
   * Pass custom for the table
   */
  customTableId?: string,
  /**
   * Pass any custom theme for table
   */
  customTheme?: ThemeProps,
  /**
   * Pass any custom style or class name for the outer div of table
   */
  customTableWrapperStyle?: string | React.CSSProperties,
  /**
   * Pass any custom style or class name for the header
   */
  customHeaderStyle?: string | React.CSSProperties,
  /**
   * Pass any custom style or class name for the row
   */
  customRowStyle?: string | React.CSSProperties,
  /**
   * Pass any custom style or class name for the outer div of table when mobile view
   */
  customMoTableWrapperStyle?: string | React.CSSProperties,
  /**
   * Pass any custom style or class name for the header when mobile view
   */
  customMoHeaderStyle?: string | React.CSSProperties,
  /**
   * Pass any custom style or class name for the row when mobile view
   */
  customMoRowStyle?: string | React.CSSProperties,
  /**
   * Function to trigger when input is changed or selected
   */
  onSelection?: (val: Array<string | number>) => void,
};