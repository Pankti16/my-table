import React from "react";

export interface RenderColumnNameAndIconProps {
    /**
     * For which column is it?
     */
    column: string,
    /**
     * What is the index of the column?
     */
    index: number,
    /**
     * What is the current sorting column?
     */
    sortKey?: string,
    /**
     * What is the current sorting order?
     */
    sortType?: string,
    /**
     * Which columns should be sortable (-1 means all and array of number for specific columns)?
     */
    sortableColumns?: Array<number> | number,
    /**
     * Which columns should not be sortable when all columns are sortable
     */
    sortableExcept?: Array<number>,
    /**
     * Click handler for sorting
     */
    onSortIconClick?: (val: string) => void,
};

export interface TableHeaderProps {
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
     * What is the current sorting column?
     */
    sortKey?: string,
    /**
     * What is the current sorting order?
     */
    sortType?: string,
    /**
     * Which columns should be sortable (-1 means all and array of number for specific columns)?
     */
    sortableColumns?: Array<number> | number,
    /**
     * Which columns should not be sortable when all columns are sortable
     */
    sortableExcept?: Array<number>,
    /**
     * Are all rows selected?
     */
    isAllSelected?: boolean,
    /**
     * Pass any custom style or class name for the header
     */
    customHeaderStyle?: string | React.CSSProperties,
    /**
     * Click handler for sorting
     */
    onSortIconClick?: (val: string) => void,
    /**
     * Click handler for checkbox/radio change
     */
    onSelectChange?: (val: string | number) => void,
}