import React from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {
    styles: LeftPanelRowStyles;
}

function ProfileButton({ styles }: Props) {
    const handleClick = () => { }

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