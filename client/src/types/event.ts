import { ModelMetadata } from './model';
import { Media } from './media';

export type EventData = {
  title: string;
  description: string;
  media?: Media[];
  location: string;
  start: Date;
  end: Date;

  community: string;
  communityName: string;
};

export type Event = EventData & ModelMetadata;