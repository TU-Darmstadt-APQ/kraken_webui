import React, { useState, useRef } from "react";
import styles from "./MyTooltip.module.css";

import { MyTooltipProps } from "@/types";

const MyTooltip: React.FC<MyTooltipProps> = ({
  infoText,
  children,
  position = "bottom",
}) => {
  // state to manage visibility
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles["tooltip-container"]}
      ref={containerRef}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      {/* Tooltip container */}
      {showTooltip && (
        <div
          className={`${styles["tooltip"]} ${styles[position]}`}
          ref={tooltipRef}
        >
          {infoText}
          {/* Arrow indicator */}
          <div
            className={`${styles["arrow"]} ${styles[`arrow-${position}`]}`}
          />
        </div>
      )}
    </div>
  );
};

export default MyTooltip;
