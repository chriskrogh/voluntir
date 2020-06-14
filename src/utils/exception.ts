export interface RouteErrorInterface {
  error: Error;
  status?: number;
}

export class RouteError implements RouteErrorInterface {
  constructor (public error: Error, public status?: number) {}
}
