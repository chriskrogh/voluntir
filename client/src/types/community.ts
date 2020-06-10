import { ModelMetadata } from './model';

export type Community = ModelMetadata & {
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  admins: string[];
  events?: string[];
}
