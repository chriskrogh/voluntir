import React, { Dispatch, SetStateAction } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Pages } from 'utils/constants';

interface Props {
    styles: LeftPanelRowStyles;
    setPage: Dispatch<SetStateAction<Pages>>;
}

function ProfileButton({ styles, setPage }: Props) {
    const handleClick = () => {
        setPage(Pages.PROFILE);
    }

    return (
        <Button className={styles.button} onClick={handleClick}>
            <div className={styles.iconContainer}>
                <AccountCircleIcon className={styles.icon} />
            </div>
            Profile
        </Button>
    );
}

export default ProfileButton;