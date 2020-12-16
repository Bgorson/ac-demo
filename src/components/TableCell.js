import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


const EnhancedTableCell = withStyles({
    paddingCheckbox: {
    padding: '0 12px 0 12px',
    },
    root:{
        padding:0
    }
  })(TableCell);

  export default EnhancedTableCell