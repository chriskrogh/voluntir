import React, { useContext, memo } from 'react';
import isEqual from 'react-fast-compare';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { LeftPanelRowStyles } from 'types/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/More';
import { Panels, Routes } from 'utils/constants';

interface IconProps {
  panel: Panels;
  className?: string;
}

const Icon = ( { panel, className }: IconProps ) => {
  switch ( panel ) {
    case Panels.HOME:
      return <HomeIcon className={className} />;
    case Panels.EXPLORE:
      return <ExploreIcon className={className} />;
    case Panels.PROFILE:
      return <AccountCircleIcon className={className} />;
    case Panels.SETTINGS:
      return <SettingsIcon className={className} />;
    case Panels.MORE:
      return <MoreIcon className={className} />;
    default:
      return <div />;
  }
}

interface Props {
  styles: LeftPanelRowStyles;
  panel: Panels;
}

function NavButton( { styles, panel }: Props ) {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext( UserContext );

  const navigate = () => {
    switch ( panel ) {
      case Panels.HOME:
        if ( location.pathname !== Routes.HOME ) {
          history.push( Routes.HOME );
        }
        break;
      case Panels.EXPLORE:
        if ( location.pathname !== Routes.EXPLORE ) {
          history.push( Routes.EXPLORE );
        }
        break;
      case Panels.PROFILE:
        if ( location.pathname !== Routes.PROFILE ) {
          // replace when api implementation is complete
          history.push( Routes.PROFILE + '?id=0' /*user._id*/ );
        }
        break;
      case Panels.SETTINGS:
        if ( location.pathname !== Routes.SETTINGS ) {
          history.push( Routes.SETTINGS );
        }
        break;
      case Panels.MORE:
        if ( location.pathname !== Routes.MORE ) {
          history.push( Routes.MORE );
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

export default memo( NavButton, isEqual );