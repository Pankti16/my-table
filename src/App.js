import React from "react";
import "./App.css";
import { Table } from "./components";
import { sampleData } from "./constants/static";

function App() {
  const tableRef = React.useRef();

  return (
    <div className="App">
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
          Change back
        </button>
      </div>
      <Table
        ref={tableRef}
        dataSource={sampleData}
        sortableColumns={-1}
        // sortableExcept={[0]}
        isSelect={true}
        isMultiSelect={false}
        customTheme={{
          "primary-color": "orange",
          "hover-color": "gold",
          "secondary-color": "lightyellow",
          "grey-color": "lightgoldenrodyellow",
          "divider-color": "darkgoldenrod",
        }}
        primaryColumn={1}
        // customTableWrapperStyle={{backgroundColor: 'orange'}} //correct
        // customMoTableWrapperStyle={{backgroundColor: 'blanchedalmond'}} //correct
        // customTableWrapperStyle={{myColor: 'blue'}} //in-correct
        // customTableWrapperStyle="my-table-wrapper" //correct
        // customHeaderStyle={{backgroundColor: 'orange'}} //correct
        // customRowStyle={{backgroundColor: 'blanchedalmond'}} //correct
        mobileHeader={"My Table"}
        onSelection={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

export default App;
