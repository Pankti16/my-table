import Table from "./Table";
import React from "react";
import { sampleData } from '../../constants/static';

import "../../App.css";

const meta = {
  component: Table,
  tags: ['autodocs'],
};

export default meta;

export const Basic = {
  args: {
    dataSource: sampleData,
    isSelect: false,
  },
};

export const AllSortable = {
  args: {
    dataSource: sampleData,
    sortableColumns: -1,
  },
};

export const SpecificSortable = {
  args: {
    dataSource: sampleData,
    sortableColumns: [1],
  },
};

export const Selectable = {
  args: {
    dataSource: sampleData,
    isSelect: true,
    isMultiSelect: true,
    onSelection: (values) => {
      console.log(`Selectable: ${values}`);
    },
  },
};

export const SelectableByPrimaryId = {
  args: {
    dataSource: sampleData,
    isSelect: true,
    isMultiSelect: true,
    primaryColumn: 1,
    onSelection: (values) => {
      console.log(`SelectableByPrimaryId: ${values}`);
    },
  },
};

export const SelectableByPrimaryName = {
  args: {
    dataSource: sampleData,
    isSelect: true,
    isMultiSelect: false,
    primaryColumn: "age",
    onSelection: (values) => {
      console.log(`SelectableByPrimaryName: ${values}`);
    },
  },
};

const TableWithThemeButton = (props) => {
  // Ref for accessing table
  const tableRef = React.useRef();

  return (
    <div>
      <div className="my-button-group">
        <button
          className="my-button"
          onClick={() => {
            tableRef?.current?.setCustomTheme(true);
          }}
        >
          Change me
        </button>
        <button
          className="my-button"
          onClick={() => {
            tableRef?.current?.setCustomTheme();
          }}
        >
          Change me back
        </button>
      </div>
      <Table
        ref={tableRef}
        dataSource={sampleData}
        customTheme={{
          "primary-color": "orange",
          "hover-color": "gold",
          "secondary-color": "lightyellow",
          "grey-color": "lightgoldenrodyellow",
          "divider-color": "darkgoldenrod",
        }}
        {...props}
      />
    </div>
  );
};

export const CustomTheme = {
  render: () => <TableWithThemeButton />,
};

export const AllProps = {
  render: () => (
    <TableWithThemeButton
      isSelect={true}
      sortableColumns={-1}
      sortableExcept={[3]}
      primaryColumn={0}
      customTableId={"myTable"}
      mobileHeader={"Users Data Table"}
      customTheme={{
        "primary-color": "orange",
        "hover-color": "gold",
        "secondary-color": "lightyellow",
        "grey-color": "lightgoldenrodyellow",
        "divider-color": "darkgoldenrod",
      }}
    />
  ),
};
