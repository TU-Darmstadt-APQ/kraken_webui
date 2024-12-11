import React, {ReactNode} from 'react';
import classes from './MyHeader.module.css';
import MyButton from '../button/MyButton';
import { MyHeaderProps } from '@/app/types';
import PostFilter from '../../PostFilter';

const MyHeader: React.FC<MyHeaderProps> = ({addingNewSensor, filter, setFilter}) => {
    return (
        <header className="header">
            {/* Logo as image */}
            <div className="logo">
                <img src="/krakenLogo.png" alt="Kraken Logo" />
                <h1>kraken</h1>
            </div>

            {/* Buttons on the right */}
            <div className="actions">
                <div className="filter-container">
                    {/* Component responsible for managing the filter inputs */}
                    <PostFilter filter={filter} setFilter={setFilter}/>
                </div>

                <MyButton className="icon-button" onClick={addingNewSensor}>
                    <img 
                        src="/plusIcon.png" 
                        alt="Add new Sensor" 
                        width={30} 
                        height={30}
                    />
                </MyButton>
            </div>
        </header>
    );
  };

export default MyHeader;
