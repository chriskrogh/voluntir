export enum Routes {
  USER = '/user',
  MEDIA = '/media',
  COMMUNITY = '/community',
  EVENT = '/event'
}

export enum ObjectRefs {
  USER = 'User',
  MEDIA = 'Media',
  COMMUNITY = 'Community',
  EVENT = 'Event'
}

export const CONTAINER_NAME = process.env.NODE_ENV === 'production' ? 'prod-media' : 'media';
