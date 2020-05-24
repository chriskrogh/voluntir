/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from 'types/user';

export function isString(x: any): x is string {
  return typeof x === "string";
}

export function isUser(x: any): x is User {
  return (x as User)._id !== undefined;
}