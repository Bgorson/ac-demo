import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const checkBoxStyles = () => ({
  root: {
    padding: "0 0 0 12px",
    "&$checked": {
      color: "#356ae6",
    },
  },

  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export default CustomCheckbox;
