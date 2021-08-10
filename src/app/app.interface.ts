export interface IPerson {
  [key: string]: any
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  num: number;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string
  },
  description: string
}
