import MyButton from "../button/MyButton";
import { MyHeaderProps } from "@/types";
import MyTooltip from "@/components/UI/tooltip/MyTooltip";
import PostFilter from "@/components/PostFilter";
import React from "react";
import classes from "./MyHeader.module.css";

/**
 * This component provides:
 * - Branding: Displays the Kraken logo.
 * - Filtering options: Integrates `PostFilter` to manage search and sorting.
 * - Action button: for adding new sensors with a tooltip.
 *
 * @component
 * @param {() => void} addingNewSensor - Callback function triggered when the "Add new sensor" button is clicked.
 * @param {Filter} filter - The current filter state controlling search and sorting.
 * @param {(filter: Filter) => void} setFilter - Callback function to update the filter state.
 *
 * @example
 * const [filter, setFilter] = useState<Filter>({
 *   sort: "",
 *   query: "",
 *   searchField: "all",
 * });
 *
 * <MyHeader
 *   addingNewSensor={() => console.log("Adding sensor")}
 *   filter={filter}
 *   setFilter={setFilter}
 * />
 *
 * @returns {JSX.Element} A styled header with filtering controls and an add button.
 */
const MyHeader: React.FC<MyHeaderProps> = ({
  addingNewSensor,
  filter,
  setFilter,
}) => {
  return (
    <header className={classes.header}>
      {/* Kraken logo and title */}
      <div className={classes.logo}>
        <img src="/krakenLogo.svg" alt="Kraken Logo" />
        <h1>kraken</h1>
      </div>

      {/* Filter controls and button(s) */}
      <div className={classes.actions}>
        <div className={classes["filter-container"]}>
          {/* Component responsible for managing the filter inputs */}
          <PostFilter filter={filter} setFilter={setFilter} />
        </div>

        <div className={classes["buttons-container"]}>
          {/* Button for adding a new sensor with tooltip */}
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
