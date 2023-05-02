import { TableBody, TableCell, Paper, Table, TableContainer, TableRow, TableHead } from '@mui/material'
import PropTypes from 'prop-types'

import ExpandableTableRow from '@components/tables/ExpandableTableRow/ExpandableTableRow'

const uuid = require('react-uuid')
const _ = require('lodash');

/**
 * A table component that supports expandable rows.
 *
 * @memberof Features.Components.Tables 
 * @param {Object} props - The props object.
 * @param {string[]} props.header - The column headers of the table.
 * @param {Object[]} props.rows - The rows of the table. Each row should have an array of cells and an optional `expandedContent` property.
 * @param {Object[]} props.rows.cells - An array of cells in the row. Each cell should have a `body` property with the content of the cell and an optional `align` property.
 * @param {Node} props.rows.expandedContent - The content to show when the row is expanded.
 *
 * @returns {JSX.Element} The rendered `ExpandableTable` component.
 */
const ExpandableTable = ({ header, rows }) => {
    return (
        <TableContainer
            component={Paper}>
            <Table
                stickyHeader  
                size="small">
                <TableHead>
                    <TableRow>
                        {header.map((item) =>
                        <TableCell 
                            key={uuid()}
                            align="left">
                                {item}
                            </TableCell>)}
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => 
                    <ExpandableTableRow
                        key={uuid()}
                        row={row.cells}
                        expandedContent={row.expandedContent}/>)}
                    </TableBody>
            </Table>
        </TableContainer>
    )
}

ExpandableTable.propTypes = {
    header: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.shape({
        cells: PropTypes.arrayOf(PropTypes.shape({
            body: PropTypes.node,
            align: PropTypes.oneOf(['left', 'right'])
        }))
    }))
}

ExpandableTable.defaultProps = {
    header: [],
    rows: [{
        cells: []
    }]
}

export default ExpandableTable
