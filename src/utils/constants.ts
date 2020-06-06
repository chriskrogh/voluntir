export enum Routes {
  USER = '/api/user',
  MEDIA = '/api/media',
  COMMUNITY = '/api/community',
  EVENT = '/api/event'
}

export enum ObjectRefs {
  USER = 'User',
  MEDIA = 'Media',
  COMMUNITY = 'Community',
  EVENT = 'Event'
}

export const CONTAINER_NAME = process.env.NODE_ENV === 'production' ? 'prod-media' : 'media';
