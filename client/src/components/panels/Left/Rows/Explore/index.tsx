import React from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';

interface Props {
    styles: LeftPanelRowStyles;
}

function ExploreButton({ styles }: Props) {
    const handleClick = () => { }

    return (
        <Button className={styles.button} onClick={handleClick}>
            <div className={styles.iconContainer}>
                <ExploreIcon className={styles.icon} />
            </div>
            Explore
        </Button>
    );
}

export default ExploreButton;