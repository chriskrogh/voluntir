import React, { SetStateAction, Dispatch } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import { Pages } from 'utils/constants';

interface Props {
    styles: LeftPanelRowStyles;
    setPage: Dispatch<SetStateAction<Pages>>;
}

function ExploreButton({ styles, setPage }: Props) {
    const handleClick = () => {
        setPage(Pages.EXPLORE);
    }

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