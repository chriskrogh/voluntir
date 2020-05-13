import React from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

interface Props {
    styles: LeftPanelRowStyles;
}

function HomeButton({ styles }: Props) {
    const handleClick = () => { }

    return (
        <Button className={styles.button} onClick={handleClick}>
            <div className={styles.iconContainer}>
                <HomeIcon className={styles.icon} />
            </div>
            Home
        </Button>
    );
}

export default HomeButton;