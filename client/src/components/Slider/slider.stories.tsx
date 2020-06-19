import React from 'react';
import Slider from '.';
import events from 'data/events';

export default {
  component: Slider,
  title: 'Slider',
};

const media = events[0].media;

export const gallery = () => (
  <div style={{ width: '100vw' }}>
    <Slider media={media || []} />
  </div>
);
