import { ModelMetadata } from './model';

export type EventData = {
    title: string;
    description: string;
    media?: string[];
};

export type Event = EventData & ModelMetadata;