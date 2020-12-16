import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';



const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#3D70B2',
      },
    },
    checked: {},
   })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export default CustomCheckbox