import React, { Dispatch } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Button } from '@material-ui/core';
import Sections from './sections';

const styles = (theme: Theme) => createStyles({
  button: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.secondary,
    width: '100%'
  },
  selectedButton: {
    backgroundColor: theme.palette.secondary.main
  },
});

interface Props extends WithStyles<typeof styles>{
  section: Sections;
  setSection: Dispatch<Sections>;
  currentSection: Sections;
}

function SelectableButton({ classes, section, setSection, currentSection }: Props) {
  return (
    <Button
      className={classnames(
        classes.button,
        { [classes.selectedButton]: section === currentSection }
      )}
      onClick={() => setSection(section)}
    >
      {section}
    </Button>
  );
}

export default withStyles(styles)(SelectableButton);