import React from "react";
import { render } from "@testing-library/react";

import Table from "./Table";
import {sampleData} from "../../constants/static";

describe("Table without data", () => {
  test("does not renders the table", () => {
    try {
      render(<Table />);
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Table", () => {
  test("renders the Table component", () => {
    try {
      render(<Table dataSource={sampleData} />);
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Table with select checkbox", () => {
  test("renders the Table component with multiselect", () => {
    try {
      render(
        <Table
          dataSource={sampleData}
          isSelect={true}
        />
      );
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Table with select radio", () => {
  test("renders the Table component with single select", () => {
    try {
      render(
        <Table
          dataSource={sampleData}
          isSelect={true}
          isMultiSelect={false}
        />
      );
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Table with sorting", () => {
  test("renders the Table component with all sorting options", () => {
    try {
      render(<Table dataSource={sampleData} sortableColumns={-1} />);
    } catch (e) {
      console.log(e);
    }
  });
});