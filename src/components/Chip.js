import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:180,
    height:20,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
        height:20,
      margin: theme.spacing(0.5),
      borderRadius:0,
    },
  },
}));

export default function SmallChips({text}) {
  const classes = useStyles();

  const handleDelete = (e) => {
    e.stopPropagation();
    console.info('You clicked the delete icon.');
  };

  const handleClick = (e) => {
    e.stopPropagation();
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root}>
      <Chip
        size="small"
        label={text}
        onClick={(e)=> handleClick(e)}
        onDelete={(e)=> handleDelete(e)}
        deleteIcon= {<ClearIcon/>}
      />
    </div>
  );
}
SmallChips.propTypes = {
    text: PropTypes.array
  };
