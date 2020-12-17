/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "./TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "./TableRow";
import ThreeDotMenu from "./ThreeDotMenu";
import Checkbox from "./Checkbox";

const headCells = [
  { id: "firstName", label: "Contact", sortable: true },
  { id: "value", label: "Total Value", sortable: true },
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
export default function EnhancedTableHead(props) {
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
