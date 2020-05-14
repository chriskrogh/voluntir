import React, { SetStateAction, Dispatch } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Pages } from 'utils/constants';

interface Props {
    styles: LeftPanelRowStyles;
    setPage: Dispatch<SetStateAction<Pages>>;
}

function HomeButton({ styles, setPage }: Props) {
    const handleClick = () => {
        setPage(Pages.HOME);
    }

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