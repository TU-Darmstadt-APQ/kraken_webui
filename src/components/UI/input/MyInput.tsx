import React, { ForwardedRef, InputHTMLAttributes } from "react";
import classes from "./MyInput.module.css";

/**
 * Custom input component that supports all standard HTML input attributes.
 *
 * This component enhances the native `<input>` element by adding custom styling
 * and supports React's `ref` forwarding for easier DOM manipulation.
 *
 * @component
 * @param {MyInputProps} props - Props extending all standard HTML input attributes.
 * @param {ForwardedRef<HTMLInputElement>} ref - React ref for accessing the underlying input element.
 * @returns {JSX.Element} A styled `<input>` element.
 */
type MyInputProps = InputHTMLAttributes<HTMLInputElement>;

const MyInput = React.forwardRef(
  (props: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <input className={classes.myInput} {...props} />;
  },
);

export default MyInput;
