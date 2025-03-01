import MyButton from "../button/MyButton";
import { MyHeaderProps } from "@/types";
import MyTooltip from "@/components/UI/tooltip/MyTooltip";
import PostFilter from "@/components/PostFilter";
import React from "react";
import classes from "./MyHeader.module.css";

const MyHeader: React.FC<MyHeaderProps> = ({
  addingNewSensor,
  filter,
  setFilter,
}) => {
  return (
    <header className={classes.header}>
      {/* Logo as image */}
      <div className={classes.logo}>
        <img src="/krakenLogo.svg" alt="Kraken Logo" />
        <h1>kraken</h1>
      </div>

      {/* Buttons on the right */}
      <div className={classes.actions}>
        <div className={classes["filter-container"]}>
          {/* Component responsible for managing the filter inputs */}
          <PostFilter filter={filter} setFilter={setFilter} />
        </div>

        <div className={classes["buttons-container"]}>
          <MyTooltip infoText="Add new Sensor" position="bottom-right">
            <MyButton id={classes["icon-button"]} onClick={addingNewSensor}>
              <img
                src="/plusIcon.png"
                alt="Add new Sensor"
                width={30}
                height={30}
              />
            </MyButton>
          </MyTooltip>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
