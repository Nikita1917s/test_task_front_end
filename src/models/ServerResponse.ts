export interface ServerResponse<T> {
    limit: number;
    skip: number;
    products: T[];
    total: number
  }