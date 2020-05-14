import React, { useState } from 'react';
import /*type*/ { Theme, WithStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import ParagraphText from 'components/typography/ParagraphText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useIsTextOverflowing from 'utils/hooks/useIsTextOverflowing';

const styles = (theme: Theme) => ({
  container: {
    transition: 'max-height .25s linear',
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 0,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: theme.palette.secondary.main,
    marginRight: 8,
  },
  icon: {
    fontSize: 24,
    color: theme.palette.text.primary,
    transition: 'transform 300ms ease',
  },
  expandedIcon: {
    transition: 'transform 300ms ease',
    transform: 'rotate(-180deg)',
  },
  buttonWrapper: {
    justifyContent: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {
  maxHeight: number;
  containerClassName?: string;
  children?: React.ReactNode;
}

function CollapseableContainer({
  classes,
  containerClassName,
  maxHeight,
  children
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isTextOverflowing, textRef] = useIsTextOverflowing();

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <>
      <div
        className={classnames(classes.container, containerClassName)}
        style={{
          maxHeight: (expanded && textRef.current)
            ? textRef.current.scrollHeight
            : maxHeight
        }}
        ref={textRef}
      >
        {children}
      </div>
      {isTextOverflowing && (
        <div className={classes.buttonContainer}>
          <button
            type="button"
            className={classes.button}
            onClick={toggleExpanded}
          >
            <div className={classes.buttonText}>
              <ParagraphText text={expanded ? 'See Less' : 'See More'} />
            </div>
            <ExpandMoreIcon
              className={classnames(
                classes.icon,
                { [classes.expandedIcon]: expanded }
              )}
            />
          </button>
        </div>
      )}
    </>
  );
}

export default withStyles(styles)(CollapseableContainer);
