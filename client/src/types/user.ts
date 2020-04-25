import { ModelMetadata } from './model';

export type UserData = {
    name: string;
    email: string;
    picture?: string;
};

export type User = UserData & ModelMetadata;