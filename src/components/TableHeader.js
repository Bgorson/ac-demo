import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "./TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "./TableRow";
import ThreeDotMenu from "./ThreeDotMenu";
import Checkbox from "./Checkbox";

const headCells = [
  { id: "firstName", label: "Contact", sortable: true },
  { id: "totalValue", label: "Total Value", sortable: true },
  { id: "location", label: "Location", sortable: false },
  { id: "deals", label: "Deals", sortable: false },
  { id: "tags", label: "Tags", sortable: false },
];
const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    height: "28px",
    color: "gray",
  },
}));
function EnhancedTableHead(props) {
  const classes = useStyles();
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow className={classes.root}>
        <TableCell className={classes.root}>
          <Checkbox
            size={"small"}
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all contacts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.root}
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
              data-testid={headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        <TableCell className={classes.root}>
          <ThreeDotMenu />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func,
  order:PropTypes.string,
  orderBy:PropTypes.string,
  numSelected:PropTypes.number,
  rowCount:PropTypes.number,
  onRequestSort:PropTypes.func
};
export default EnhancedTableHead
