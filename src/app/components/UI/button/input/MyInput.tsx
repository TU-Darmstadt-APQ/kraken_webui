import React, {ReactNode} from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef((props: any, ref) => {
    return (
      <input className={classes.myInput} {...props}/>
    );
  });

export default MyInput;