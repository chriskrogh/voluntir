import React from 'react';
import Slider from '.';
import events from 'data/events';
import { ScreenSize } from 'types/theme';

export default {
    component: Slider,
    title: 'Slider',
};

const media = events[0].media;

export const gallery = () => (
    <div style={{ width: '100vw' }}>
        <Slider
            media={media || []}
            screenSize={ScreenSize.MD}
        />
    </div>
);