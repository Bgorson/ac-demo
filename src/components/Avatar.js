import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      background: "#c3a7fc",
    },
  },
  small: {
    fontSize: "10px",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function ImageAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar {...props} className={classes.small} />
    </div>
  );
}
