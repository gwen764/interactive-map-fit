import { useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const _ = require('lodash');
const uuid = require('react-uuid')

const styles = {
    row: {
        '& > *': { borderBottom: 'unset' }
    },
    expandedContent: { 
        paddingBottom: 0,
        paddingTop: 0
    }
}

/**
 * A table row component that can expand to show additional content when a toggle button is clicked.
 * 
 * @memberof Features.Components.Tables
 * @param {Object} props - The component props.
 * @param {Array} props.row - An array of objects representing the cells of the table row. Each object has a `body` property for the cell content and an optional `align` property for the cell alignment.
 * @param {Node} props.expandedContent - The content to show when the row is expanded.
 * 
 * @returns {JSX.Element} - The component's UI.
 */
const ExpandableTableRow = ({ row, expandedContent }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow 
                sx={styles.row}>
                {row?.map((cell) =>
                     <TableCell
                        key={uuid()} 
                        align={cell?.align}>
                        {cell?.body}
                     </TableCell>
                )}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    colSpan={row?.length + 1}
                    style={styles.expandedContent}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {expandedContent}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

ExpandableTableRow.propTypes = {
    row: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.node,
        align: PropTypes.oneOf(['left', 'right'])
    })),
    expandedContent: PropTypes.node
}

ExpandableTableRow.defaultProps = {
    row: [],
    expandedContent: <></>
}

export default ExpandableTableRow