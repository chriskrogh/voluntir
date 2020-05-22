import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Panels, Routes } from 'utils/constants';

interface IconProps {
    panel: Panels;
    className?: string;
}

const Icon = ({ panel, className }: IconProps) => {
    switch (panel) {
        case Panels.HOME:
            return <HomeIcon className={className} />;
        case Panels.EXPLORE:
            return <ExploreIcon className={className} />;
        case Panels.PROFILE:
            return <AccountCircleIcon className={className} />;
        default:
            return <div />;
    }
}

interface Props {
    styles: LeftPanelRowStyles;
    panel: Panels;
}

function NavButton({ styles, panel }: Props) {
    const history = useHistory();
    const location = useLocation();

    const navigate = () => {
        switch (panel) {
            case Panels.HOME:
                if (location.pathname !== Routes.HOME) {
                    history.push(Routes.HOME);
                }
                break;
            case Panels.EXPLORE:
                if (location.pathname !== Routes.EXPLORE) {
                    history.push(Routes.EXPLORE);
                }
                break;
            case Panels.PROFILE:
                if (location.pathname !== Routes.PROFILE) {
                    history.push(Routes.PROFILE);
                }
                break;
            default:
                break;
        }
    }

    return (
        <Button className={styles.button} onClick={navigate}>
            <div className={styles.iconContainer}>
                <Icon panel={panel} className={styles.icon} />
            </div>
            <div className={styles.labelContainer}>
                {panel}
            </div>
        </Button>
    );
}

export default NavButton;