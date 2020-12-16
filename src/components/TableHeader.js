/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import Checkbox from './Checkbox'

        const headCells = [
            { id: 'firstName', numeric: false, disablePadding: true, label: 'Contact' },
            { id: 'value', numeric: true, disablePadding: false, label: 'Total Value' },
            { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
            { id: 'deals', numeric: true, disablePadding: false, label: 'Deals' },
            { id: 'tags', numeric: true, disablePadding: false, label: 'Tags' }
          ];
          const useStyles = makeStyles((theme) => ({
            root: {
             height:'28px',
            }
          }));
export default function EnhancedTableHead(props) {
    const classes = useStyles();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead style={{ height: 24}} className={classes.root}>
        <TableRow >
          <TableCell padding="checkbox">
            <Checkbox
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all contacts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
            //   padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
