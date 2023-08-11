# Table

The table is a React package for displaying responsive and customizable tables using HTML, CSS, and media queries, without any third-party dependency. This table will take several props to show and customize the table layout. This table supports two layouts one layout with row column and another layout with all the data in key-value mapping per row. The later layout is generally refered as mobile table layout, and the former layout is generally refered as desktop table layout. Mobile table layout will be visible when the width of screen is smaller and there are either more than 3 columns or 3 columns with selection enable. Yes, this table component does have row selection option with checkbox/radio (based on the props passed). One can access the selected row values by passing a callback function.

# Installation
```bash
	npm install 
```

## Usage

```javascript
import {Table} from "my-table";

<Table dataSource={data} />;
```

## Props

Table component have several props for displaying data and customizing the table

|                                                                  | Description                                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                              |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| dataSource\*                                                     | It is a required prop for showing data in the table                                                                                                                                                                                                                                                                                                                   | Array of objects                                                                                                                  |
| sortableColumns                                                  | Columns which you want to be sortable. Pass `-1` if want to sort all columns or array of column number from 0, for e.g., `[0, 1]`                                                                                                                                                                                                                                     | Number or array of numbers                                                                                                        |
| sortableExcept                                                   | Columns which you do not want to sort in case of `sortableColumns = -1`. When you pass sortableColumns as an array this prop will be ignored.                                                                                                                                                                                                                          | Array of numbers                                                                                                                  |
| isSelect                                                         | This will enable selection of row with checkbox or radio.                                                                                                                                                                                                                                                                                                             | Boolean                                                                                                                           |
| isMultiSelect                                                    | This will enable selection of row with checkbox. If this is set to false will enable selection of row width radio. By default value is `true` . This prop will be ignored if `isSelect = false`                                                                                                                                                                       | Boolean                                                                                                                           |
| primaryColumn                                                    | This prop is used in the process of row selection, this column will be passed as a value prop for checkbox/radio, and same will be obtained from the callback `onSelection`. If string is passed it should be a valid object key for the `dataSource` passed or will take fallback value, and if number is passed it should be a valid column number starting from 0. | String or number                                                                                                                  |
| mobileHeader                                                     | This prop will show caption text on the table when mobile table layout is rendered.                                                                                                                                                                                                                                                                                   | String                                                                                                                            |
| customTableId                                                    | This prop will be able to set custom html id to the table.                                                                                                                                                                                                                                                                                                            | String                                                                                                                            |
| onSelection                                                      | This prop will return the value of selected rows from the table                                                                                                                                                                                                                                                                                                       | Function                                                                                                                          |
| customTheme                                                      | This prop will allow to change theme of the table.                                                                                                                                                                                                                                                                                                                    | Object of `themeProps` _(Check [below](#allowed-themeProps) for allowed themeProps)_                                              |
| customTableWrapperStyle, customHeaderStyle, customRowStyle       | These are the props for taking custom style for the div holding the table, header row of the table and rest of the rows of the table.                                                                                                                                                                                                                                 | String _(will be used as a `className`)_ or object of `CSSProperties` _(It will accept react css variables as valid key-value pair)_ |
| customMoTableWrapperStyle, customMoHeaderStyle, customMoRowStyle | These are the props for taking custom style for the div holding the table, header row of the table and rest of the rows of the table. These styles will be apply to the mobile table layout                                                                                                                                                                           | String _(will be used as a `className`)_ or object of `CSSProperties` _(It will accept react css variables as valid key-value pair)_ |

## Allowed themeProps

Allowed keys for customTheme object. These object will allow to change colors, padding, border radius, font-family, font-size, and box-shadow for the table
| | Description|
|-------------|------------------|
|`primary-color` | Main color used throughout the table|
|`secondary-color` | Secondary color used for showing hilglighting or selected rows.|
|`hover-color` | Color used to show hover effect.|
|`bg-color` | Default background color used for table and table rows|
|`text-color` | Default text color throughout the table. |
|`divider-color`| Color for divider between rows. |
|`grey-color`| Color for table header background. |
|`border-color`| Color for border of selection/input elements. |
|`error-color`| Color to show error message when invalid prop is passed.|
|`box-shadow`| Bax shadow applied to the table.|
|`padding`| Padding for each table cell in desktop layout.|
|`h-font-size`| Font size of header text.|
|`c-font-size`| Font size of rest of body text.|
|`font-family`| Font family used throughout the table.|
|`table-border-radius`| Border radius of table in desktop layout.|

## Changing between themes

To change between custom theme and default theme a table method `setCustomTheme` needs to be called. Passing customTheme is not sufficient in-order to change the theme of whole table. We need to call this method as well. This method takes on argument as a boolean value, by default it is false. To set custom theme call it with `true` value like `setCustomTheme(true)` and to revert back to default theme `setCustomTheme()`.

```javascript
import {Table} from "my-table";

const tableRef = React.useRef();

<Table
	ref={tableRef}
	dataSource={data}
/>

<button onClick={() => tableRef?.current?.setCustomTheme(true)}>Change theme</button>
```
