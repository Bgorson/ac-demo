/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Avatar from "./Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "./TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "./TableRow";
import Checkbox from "./Checkbox";
import CustomTableHeader from "./TableHeader";
import ActionButton from "./ActionButton";
import Chip from './Chip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: "2rem",
    border: "1px solid lightGrey;",
  },
  paper: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  contact: {
    fontWeight: 600,
    color: "#356ae6",
    display: "flex",
    alignItems: "baseline",
  },
}));
var currency_symbols = {
  'usd': '$', 
  'eur': '€', 
  'aud': 'A$', 
  'gbp': '£', 
  'jpy': '¥', 
  'krw': '₩',
};
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomTable({ rows }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("firstName");
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label="table">
          <CustomTableHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const firstNameLetter = row.firstName.charAt(0);
                const LastNameLetter = row.lastName.charAt(0);
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        size={"small"}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className={classes.contact}>
                        <Avatar alt={row.firstName} src="/someImage.jpg">
                          {firstNameLetter}
                          {LastNameLetter}
                        </Avatar>
                        {row.firstName} {row.lastName}
                      </div>
                    </TableCell>
                    <TableCell align="left">{currency_symbols[row?.dealCurrency]}{row.totalValue== 0 ? null:row.totalValue}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.amountOfDeals|| 0}</TableCell>
                    <TableCell style={{display:"flex"}} align="left">{row.tagText.map((element, index)=>(
                     <Chip key= {index} text= {element}/>
                    ))}</TableCell>
                    <TableCell align="left">
                      <ActionButton isItemSelected={isItemSelected} />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
