import React, { SetStateAction, Dispatch } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Pages } from 'utils/constants';

interface IconProps {
    page: Pages;
    className?: string;
}

const Icon = ({ page, className }: IconProps) => {
    switch (page) {
        case Pages.HOME:
            return <HomeIcon className={className} />;
        case Pages.EXPLORE:
            return <ExploreIcon className={className} />;
        case Pages.PROFILE:
            return <AccountCircleIcon className={className} />;
    }
}

interface Props {
    styles: LeftPanelRowStyles;
    setPage: Dispatch<SetStateAction<Pages>>;
    page: Pages;
}

function ExploreButton({ styles, page, setPage }: Props) {
    const handleClick = () => {
        setPage(page);
    }

    return (
        <Button className={styles.button} onClick={handleClick}>
            <div className={styles.iconContainer}>
                <Icon page={page} className={styles.icon} />
            </div>
            <div className={styles.labelContainer}>
                {page}
            </div>
        </Button>
    );
}

export default ExploreButton;