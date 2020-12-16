import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';


const tableRowStyles = theme => ({
    root: {
      '&$selected': {
        backgroundColor: '#FAFBFF',
      },
        "&$hover:hover": {
            backgroundColor: '#FAFBFF',
        },
    },
    selected: {
    },
    hover:{}
   })

const EnhancedTableRow = withStyles(tableRowStyles)(TableRow);
export default EnhancedTableRow
