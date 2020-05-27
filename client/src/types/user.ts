import { ModelMetadata } from './model';

export type Credentials = {
  email: string;
  secret: string;
}

export type UserData = Credentials & {
  name: string;
  secret?: string;
  picture?: string;
  banner?: string;
};

export type User = UserData & ModelMetadata;