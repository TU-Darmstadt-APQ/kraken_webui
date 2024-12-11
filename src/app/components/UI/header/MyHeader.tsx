//import React, {ReactNode} from 'react'; // Remove unused import
//import classes from './MyHeader.module.css'; // Remove unused import
import MyButton from '../button/MyButton';

const MyHeader= ({addingNewSensor} : {addingNewSensor: () => void}) => {
    return (
        <header className="header">
            {/* Logo als Bild */}
            <div className="logo">
                <img src="/krakenIcon.png" alt="Kraken Logo" />
                <h1>kraken</h1>
            </div>
            {/* Buttons rechts */}
            <div className="buttons">
                <MyButton onClick={addingNewSensor}>Add new Sensor</MyButton>
                <MyButton>Option 2</MyButton>
                <MyButton>Option 3</MyButton>
                <MyButton>Option 4</MyButton>
                <MyButton>Option 5</MyButton>
            </div>
        </header>
    );
  };

export default MyHeader;
