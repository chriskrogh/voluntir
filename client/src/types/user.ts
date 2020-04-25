import { ModelMetadata } from './model';

export type UserData = {
    id?: string;
    name: string;
    email: string;
    pictureUrl?: string;
};

export type User = UserData & ModelMetadata;