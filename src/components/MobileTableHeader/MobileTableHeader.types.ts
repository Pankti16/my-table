export interface MobileTableHeaderProps {
    /**
     * Is it the selectable table?
     */
    isSelect?: boolean,
    /**
     * Is it multiselect(checkbox) or singleselect(radio)
     */
    isMultiSelect?: boolean,
    /**
     * Pass header for mobile table
     */
    mobileHeader?: string,
    /**
     * Are all rows selected?
     */
    isAllSelected?: boolean,
    /**
     * Pass any custom style or class name for the header
     */
    customHeaderStyle?: string | React.CSSProperties,
    /**
     * Click handler for checkbox/radio change
     */
    onSelectChange?: (val: string | number) => void,
  }