import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const options = ["Remove", "Email"];
const useStyles = makeStyles(() => ({
  mainButton: {
    padding: 15,
    fontSize: 12,
    height: "28px",
    backgroundColor: "white",
    textTransform: "none",
  },
  arrowButton: {
    fontSize: 12,
    minWidth: 10,
    padding: 0,
    backgroundColor: "white",
  },
  buttonDisplay: {
    visibility: "visible",
  },
  buttonHide: {
    visibility: "hidden",
  },
}));
export default function ActionButton({ isItemSelected }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleMenuItemClick = (event, index) => {
    event.stopPropagation();
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup
        className={isItemSelected ? classes.buttonDisplay : classes.buttonHide}
        classvariant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button className={classes.mainButton} onClick={handleClick}>
          {options[selectedIndex]}
        </Button>
        <Button
          className={classes.arrowButton}
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={(e) => handleToggle(e)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        style={{
          zIndex: 7000,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
ActionButton.propTypes = {
  isItemSelected: PropTypes.bool
};