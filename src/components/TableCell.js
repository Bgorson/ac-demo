import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


const EnhancedTableCell = withStyles({
    paddingCheckbox: {
    padding: 0,
    },
    root:{
        padding:'5px 12px 0 0'
    }
  })(TableCell);

  export default EnhancedTableCell