import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const EnhancedTableCell = withStyles({
  paddingCheckbox: {
    padding: 0,
  },
  root: {
    height: 45,
    padding: "0",
  },
  head: {
    height: 26,
    padding: 0,
  },
})(TableCell);

export default EnhancedTableCell;
