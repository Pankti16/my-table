export interface SortIconProps {
    /**
     * What is this column name?
     */
    column: string,
    /**
     * What is the current sorting column name?
     */
    sortKey?: string,
    /**
     * What is the sorting order?
     */
    type?: string,
}