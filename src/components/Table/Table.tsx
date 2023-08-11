import React from "react";
import "./style.scss";

import TableHeader from "../TableHeader/TableHeader";
import MobileTableHeader from "../MobileTableHeader/MobileTableHeader";
import TableBody from "../TableBody/TableBody";
import MobileTableBody from "../MobileTableBody/MobileTableBody";

import { useSortableData } from "../../hooks/useSortableData";
import { useDeviceType } from "../../hooks/useDeviceType";
import { isString } from "../../utils";
import { TablePropType } from './Table.types';
import { ThemeProps, cssProperties, themeProperties } from "../../constants/interfaces";

type Ref = {
  setCustomTheme: (isCustom?:boolean) => void
} | null;

// Component to show table
const MyTable = React.forwardRef<Ref, TablePropType>((props: TablePropType, ref) => {
  const {
    dataSource,
    sortableColumns,
    sortableExcept,
    isSelect = false,
    isMultiSelect = true,
    primaryColumn,
    mobileHeader,
    customTableId,
    customTableWrapperStyle,
    customHeaderStyle,
    customRowStyle,
    customMoTableWrapperStyle,
    customMoHeaderStyle,
    customMoRowStyle,
    customTheme,
    onSelection,
  } = props;
  const tableRef = React.useRef<HTMLDivElement>(null);
  // Extract columns from the data (using keys from array of object)
  const columns = Object.keys(Object.assign({}, ...dataSource));
    ;
  //Variable to hold selected rows
  const [selectedRows, setSelectedRows] = React.useState<any>([]);
  //Variable to hold whether all is selected in case of multiselect or not
  const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
  //Variable to hold default theme
  const [defaultTheme, setDefaultTheme] = React.useState<ThemeProps>({});
  //Variable to hold sorted data, sorting method, and sorting config
  const { items, requestSort, sortConfig } = useSortableData(
    columns,
    dataSource
  );
  //Variable to hold whether rendered on mobile or not
  const { isMobile, isSmallScreen } = useDeviceType();
  //Variable to hold column condition
  const isMoreColForMobile = (columns?.length > 3 || (columns?.length === 3 && isSelect));
  //Variable to hold whether to render mobile view or desktop view
  const showMobileView = ((isMobile && isSmallScreen) || isSmallScreen) && isMoreColForMobile;

  //Get default root style and save in the variable
  React.useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const defaultValues: any = {};
    for (const val in themeProperties) {
      defaultValues[themeProperties[val]] = styles.getPropertyValue(
        `--${themeProperties[val]}`
      );
    }
    setDefaultTheme(defaultValues);
  }, []);

  //Reset row selection when isSelect or isMultiSelect is updated
  React.useEffect(() => {
    setSelectedRows([]);
    setIsAllSelected(false);
  }, [isSelect, isMultiSelect]);

  //Make method to be accessed via ref
  React.useImperativeHandle(ref, () => ({
    setCustomTheme,
  }));

  //Compute primary column for selected row value
  const _primaryColumn = React.useCallback(() => {
    //If primary column is a number then the value column will be columns[primaryColumn]
    //If primary column is a string, and it is in columns array then the value column will be primaryColumn
    //If above both condition fails then the value column will be columns[0]
    return primaryColumn
      ? Number.isInteger(primaryColumn)
        ? columns[Number(primaryColumn)]
        : columns?.includes(primaryColumn?.toString())
          ? primaryColumn
          : columns[0]
      : columns[0];
  }, [columns, primaryColumn]);

  //Handle when sort icon is clicked
  const onSortClick = (column: string) => {
    //Make call to sort method with sorting column
    requestSort(column);
  };

  //Handle when input selection is made/changed
  const onSelectChange = (checkValue: string | number) => {
    //If selection is true and is radio (singleselect)
    if (isSelect && !isMultiSelect) {
      //Then only one value will be there
      setSelectedRows([checkValue]);
      //If parent callback method for selection is given then call it
      if (!onSelection) return;
      onSelection([checkValue]);
      //Else if selection is true and is checkbox (multiselect)
    } else if (isSelect) {
      //Make a copy of the current array
      let _checkedRows: any = Array.from(selectedRows);
      //If all is clicked and it was not selected update the bool variable and add all to the array
      if (checkValue === "All" && !isAllSelected) {
        //Select all
        _checkedRows = items.map((e: any) => e[_primaryColumn()]);
        setIsAllSelected(true);
        //Else if all is clicked and it was selected update the bool variable and remove all elements from the array
      } else if (checkValue === "All" && isAllSelected) {
        setIsAllSelected(false);
        _checkedRows = [];
        //Else handle single checkbox click
      } else {
        const rowIndex = _checkedRows.findIndex(
          (e: any) =>
            e?.toString()?.toLowerCase() ===
            checkValue?.toString()?.toLowerCase()
        );
        //If it was already there the remove from the array
        if (rowIndex !== -1) {
          //Remove
          _checkedRows.splice(rowIndex, 1);
          //Else add it to the array
        } else {
          //Add
          _checkedRows.push(checkValue);
        }
      }
      setSelectedRows(_checkedRows);
      //If parent callback method for selection is given then call it
      if (!onSelection) return;
      onSelection(_checkedRows);
    }
  };

  //Handle when custom theme needs to be updated
  //By default, isCustom is false, means it will set the theme to default
  const setCustomTheme = (isCustom = false) => {
    if (isCustom && !customTheme) return; // If isCustom and custom theme is not there, do not proceed
    if (!isCustom && !defaultTheme) return; // If not isCustom and default theme is not there, do not proceed
    const theme: any = isCustom ? customTheme : defaultTheme; // get theme based on isCustom
    //Loop through each item in theme
    for (const value in theme) {
      //If theme value is given then set it
      if (value && theme[value]) {
        document.documentElement.style.setProperty(`--${value}`, theme[value]);
      }
    }
  };

  //Temp variable holder for showing table header
  //If is mobile view and there are more than 3 columns, show mobile header view
  //If is mobile view and there are 3 columns but selection is also enabled, show mobile header view
  //If both above fails, show desktop header view

  //Temp variable holder for showing table body
  //If is mobile view and there are more than 3 columns, show mobile body view
  //If is mobile view and there are 3 columns but selection is also enabled, show mobile body view
  //If both above fails, show desktop body view

  //Check whether custom table wrapper style is string or object
  const isWrapperStyleStr = isString(customTableWrapperStyle);
  //Check whether custom mobile table wrapper style is string or object
  const isMoWrapperStyleStr = isString(customMoTableWrapperStyle);

  return (
    // Show table wrapper
    <div
      ref={tableRef}
      className={`table-wrapper ${showMobileView && customMoTableWrapperStyle
          ? isMoWrapperStyleStr
            ? customMoTableWrapperStyle
            : ""
          : isWrapperStyleStr
            ? customTableWrapperStyle
            : ""
        }`}
      style={
        showMobileView && customMoTableWrapperStyle
          ? !isMoWrapperStyleStr
            ? customMoTableWrapperStyle as React.CSSProperties
            : {}
          : !isWrapperStyleStr
            ? customTableWrapperStyle as React.CSSProperties
            : {}
      }
      id={customTableId ? customTableId : ""}
    >
      {/* Show table */}
      <table
        className={`my-table`}>
        {/* Show table header */}
        {showMobileView ? (
          <MobileTableHeader
            customHeaderStyle={customMoHeaderStyle}
            {...{
              mobileHeader,
              isSelect,
              isMultiSelect,
              onSelectChange,
              selectedRows,
              isAllSelected,
            }}
          />
        ) : (
          <TableHeader
            {...{
              columns,
              isSelect,
              isMultiSelect,
              sortableColumns,
              sortableExcept,
              onSelectChange,
              selectedRows,
              isAllSelected,
              customHeaderStyle,
            }}
            sortKey={sortConfig?.key}
            sortType={sortConfig?.direction}
            onSortIconClick={onSortClick}
          />
        )}
        {/* Show table body */}
        {showMobileView ? (
          <MobileTableBody
            data={items}
            primaryColumn={_primaryColumn()}
            customRowStyle={customMoRowStyle ?? ''}
            {...{
              columns,
              isSelect,
              isMultiSelect,
              selectedRows,
              onSelectChange,
            }}
          />
        ) : (
          <TableBody
            data={items}
            primaryColumn={_primaryColumn()}
            {...{
              columns,
              isSelect,
              isMultiSelect,
              selectedRows,
              onSelectChange,
              customRowStyle,
            }}
          />
        )}
      </table>
    </div>
  );
});

//Component to wrap table and check for error before proceeding
const Table= React.forwardRef<Ref, TablePropType>((props: TablePropType, ref) => {
  //Variable to hold error message
  const [errorMsg, setErrorMsg] = React.useState("");

  //Check for error and update error message
  React.useMemo(() => {
    let _errorMsg = "";
    //Check if data source is valid or not
    if (
      !props.dataSource ||
      !Array.isArray(props.dataSource) ||
      props.dataSource?.length === 0
    ) {
      _errorMsg +=
        "\nInvalid prop dataSource supplied to Table. Validation failed.";
    } else if (Array.isArray(props.dataSource)) {
      const anyNotObj = props.dataSource.find((e) => typeof e !== "object");
      if (anyNotObj) {
        _errorMsg +=
          "\nInvalid prop dataSource supplied to Table. Validation failed.";
      }
    }

    if (props.sortableColumns || props.sortableColumns === 0) {
      if (
        (typeof props.sortableColumns !== "number" &&
          !Array.isArray(props.sortableColumns)) ||
        (typeof props.sortableColumns === "number" &&
          props.sortableColumns !== -1)
      ) {
        _errorMsg +=
          "\nInvalid prop sortableColumns supplied to Table. Validation failed.";
      } else if (Array.isArray(props.sortableColumns)) {
        const anyNotObj = props.sortableColumns.find(
          (e) => typeof e !== "number"
        );
        if (anyNotObj) {
          _errorMsg +=
            "\nInvalid prop sortableColumns supplied to Table. Validation failed.";
        }
      }
    }

    if ((props?.sortableExcept || Number(props?.sortableExcept) === 0) && props?.sortableColumns === -1) {
      if (!Array.isArray(props.sortableExcept)) {
        _errorMsg +=
          "\nInvalid prop sortableExcept supplied to Table. Validation failed.";
      } else if (Array.isArray(props.sortableExcept)) {
        const anyNotObj = props.sortableExcept.find(
          (e) => typeof e !== "number"
        );
        if (anyNotObj) {
          _errorMsg +=
            "\nInvalid prop sortableExcept supplied to Table. Validation failed.";
        }
      }
    }

    if (props.isSelect) {
      if (typeof props.isSelect !== "boolean") {
        _errorMsg +=
          "\nInvalid prop isSelect supplied to Table. Validation failed.";
      }
    }

    if (props.isMultiSelect) {
      if (typeof props.isMultiSelect !== "boolean") {
        _errorMsg +=
          "\nInvalid prop isMultiSelect supplied to Table. Validation failed.";
      }
    }

    if (props.primaryColumn || props.primaryColumn === 0) {
      if (
        typeof props.primaryColumn !== "string" &&
        typeof props.primaryColumn !== "number"
      ) {
        _errorMsg +=
          "\nInvalid prop primaryColumn supplied to Table. Validation failed.";
      }
    }

    if (props.mobileHeader) {
      if (typeof props.mobileHeader !== "string") {
        _errorMsg +=
          "\nInvalid prop mobileHeader supplied to Table. Validation failed.";
      }
    }

    if (props.customTableId) {
      if (typeof props.customTableId !== "string") {
        _errorMsg +=
          "\nInvalid prop customTableId supplied to Table. Validation failed.";
      }
    }

    if (props.customTableWrapperStyle) {
      if (
        typeof props.customTableWrapperStyle !== "string" &&
        Object.keys(props.customTableWrapperStyle).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customTableWrapperStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customRowStyle) {
      if (
        typeof props.customHeaderStyle !== "string" &&
        Object.keys(props.customHeaderStyle ?? {}).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customHeaderStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customRowStyle) {
      if (
        typeof props.customRowStyle !== "string" &&
        Object.keys(props.customRowStyle).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customRowStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customMoTableWrapperStyle) {
      if (
        typeof props.customMoTableWrapperStyle !== "string" &&
        Object.keys(props.customMoTableWrapperStyle).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customMoTableWrapperStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customMoHeaderStyle) {
      if (
        typeof props.customMoHeaderStyle !== "string" &&
        Object.keys(props.customMoHeaderStyle).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customMoHeaderStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customMoRowStyle) {
      if (
        typeof props.customMoRowStyle !== "string" &&
        Object.keys(props.customMoRowStyle).filter(o => !cssProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customMoRowStyle supplied to Table. Validation failed.";
      }
    }

    if (props.customTheme) {
      if (
        typeof props.customTheme !== "object" &&
        Object.keys(props.customTheme).filter(o => !themeProperties.includes(o)).length > 0
      ) {
        _errorMsg +=
          "\nInvalid prop customTheme supplied to Table. Validation failed.";
      }
    }

    if (props.onSelection) {
      if (typeof props.onSelection !== "function") {
        _errorMsg +=
          "\nInvalid prop onSelection supplied to Table. Validation failed.";
      }
    }

    setErrorMsg(_errorMsg);
  }, [props]);

  //Return error view if any error
  if (errorMsg) {
    return <div className="error-msg">{errorMsg}</div>;
  }

  //Else show the table
  return <MyTable {...props} ref={ref} />;
});

export default Table;
