import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props['open']);

  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

  React.useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={props['time']} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={props['level']}>
          {props['content']}
        </Alert>
      </Snackbar>
    </div>
  );
}