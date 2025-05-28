// types.ts

export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
    country: string;
  };
  phone: string;
  orders: number[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
