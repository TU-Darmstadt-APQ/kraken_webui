import React, { ForwardedRef, InputHTMLAttributes } from "react";
import classes from './MyInput.module.css';


// Props-Typen für MyInput definieren
type MyInputProps = InputHTMLAttributes<HTMLInputElement>;

const MyInput = React.forwardRef((props: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input className={classes.myInput} {...props}/>
    );
  });

export default MyInput;