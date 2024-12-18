import React, { ForwardedRef, InputHTMLAttributes } from "react";
import classes from './MyInput.module.css';
import tooltipStyles from './../tooltip/MyTooltip.module.css';


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
interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string; // Optional Text for Error Tooltip
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'; // Optional Field for Tooltip orientation
}

const MyInput = React.forwardRef(({ error, tooltipPosition = 'bottom', ...props }: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div style={{ position: 'relative' }}>
        <input className={classes.myInput} ref={ref} {...props} />
        
        {/* Toolttp for error */}
        {error && (
          <div className={`${tooltipStyles.tooltip} ${tooltipStyles[tooltipPosition]}`}>
            {error}
            <div className={`${tooltipStyles.arrow} ${tooltipStyles[`arrow-${tooltipPosition}`]}`} />
          </div>
        )}
      </div>
    );
  });

export default MyInput;