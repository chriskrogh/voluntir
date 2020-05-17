import React, { useState, useEffect } from 'react';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigatePreviousIcon from '@material-ui/icons/NavigateBefore';
import { Media } from 'types/media';

const transitionTime = '0.3s';

const styles = () => createStyles({
    slider: {
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        transition: transitionTime
    },
    slide: {
        minWidth: '100%',
        transition: transitionTime
    },
    image: {
        maxWidth: '100%',
    },
    button: {
        position: 'absolute',
        top: '50%',
        width: 40,
        height: '100%',
        transform: 'translateY(-50%)',
        transition: transitionTime
    },
    leftButton: {
        left: 0
    },
    rightButton: {
        right: 0
    },
    icon: {
        fontSize: 24,
    }
});

const getIndex = (translateValue: number) => ((translateValue / 100) * -1);

interface Props extends WithStyles<typeof styles> {
    media: Media[];
}

function Slider({ classes, media }: Props) {
    const [translateValue, setTranslateValue] = useState(0);

    const slideHeight = (552) / media[getIndex(translateValue)].AR;

    const [sliderHeight, setSliderHeight] = useState(slideHeight);

    const hasManyItems = media.length > 0;
    const lastItemPosition = -100 * (media.length - 1);
    const firstItemPosition = 0;

    const goLeft = () => {
        setTranslateValue((translateValue === firstItemPosition)
            ? lastItemPosition
            : translateValue + 100
        );
    }

    const goRight = () => {
        setTranslateValue((translateValue === lastItemPosition)
            ? firstItemPosition
            : translateValue - 100
        );
    }

    useEffect(() => {
        setSliderHeight(slideHeight);
    }, [slideHeight])

    return (
        <div className={classes.slider} style={{ height: sliderHeight }}>
            {media.map((medium) => (
                <div
                    key={medium._id}
                    className={classes.slide}
                    style={{ transform: `translateX(${translateValue}%)` }}
                >
                    <img
                        src={medium._id}
                        alt="medium"
                        className={classes.image}
                    />
                </div>
            ))}
            {hasManyItems && (
                <Button
                    className={classnames(classes.button, classes.leftButton)}
                    onClick={goLeft}
                >
                    <NavigatePreviousIcon className={classes.icon} />
                </Button>
            )}
            {hasManyItems && (
                <Button
                    className={classnames(classes.button, classes.rightButton)}
                    onClick={goRight}
                >
                    <NavigateNextIcon className={classes.icon} />
                </Button>
            )}
        </div>
    );
}

export default withStyles(styles)(Slider);