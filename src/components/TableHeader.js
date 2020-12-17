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
import TableRow from './TableRow';
import Paper from '@material-ui/core/Paper';
import ThreeDotMenu from './ThreeDotMenu'
// import Checkbox from '@material-ui/core/Checkbox';
import Checkbox from './Checkbox'

        const headCells = [
            { id: 'firstName', numeric: false, label: 'Contact' },
            { id: 'value', numeric: false, label: 'Total Value' },
            { id: 'location', numeric: false,  label: 'Location' },
            { id: 'deals', numeric: false, label: 'Deals' },
            { id: 'tags', numeric: false,  label: 'Tags' }
          ];
          const useStyles = makeStyles((theme) => ({
            root: {
                 padding: 0,
                 height: '28px',
                 color: 'gray',
            }
          }));
export default function EnhancedTableHead(props) {
    const classes = useStyles();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead >
        <TableRow className={classes.root}>
          <TableCell className={classes.root}>
            <Checkbox
            size={'small'}
             color="primary"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all contacts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              className={classes.root}
              key={headCell.id}
              align={'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell className={classes.root} >
            <ThreeDotMenu/>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
