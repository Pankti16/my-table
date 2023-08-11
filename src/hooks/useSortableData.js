import React from "react";
// Get sort-order enum/object/interface
import { SortOrder } from "../constants/interfaces";
//Hook for sorting tables data source based on the column and sort order
export const useSortableData = (columns, items, config = null) => {
  //Keep track of current sorting order and sorting column
  const [sortConfig, setSortConfig] = React.useState(config);

  //Sort items and get sorted array in return
  const sortedItems = React.useMemo(() => {
    if (!sortConfig) return items; //Do not proceed if no config
    if (sortConfig?.direction === SortOrder.NONE) return items; //Do not proceed is sorting order is default
    if (!sortConfig?.key) return items; //Do not proceed if sorting column is not given
    if (!columns) return items; //Do not proceed if columns array is not given
    if (!columns.includes(sortConfig?.key)) return items; //Do not proceed if sorting column is not present in columns
    //Create copy of column data
    const sortableItems = Array.from(items);
    //Sort column data based on the sorting order
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === SortOrder.ASC ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === SortOrder.ASC ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [columns, items, sortConfig]);

  //Request sorting of data by column
  const requestSort = (key) => {
    //Assume default sorting order is ascending
    let direction = SortOrder.ASC;
    //If there is any previous sorting order then set the next sorting order
    if (sortConfig?.key === key &&
      sortConfig?.direction === SortOrder.ASC
    ) {
      direction = SortOrder.DESC;
    }
    //Set config for the next time
    setSortConfig({ key, direction });
  };
  //Return sorted data, sorting method callback, and sorting config
  return { items: sortedItems, requestSort, sortConfig };
};
