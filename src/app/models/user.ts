export enum UserType {
  Company,
  Buyer,
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  userType: UserType;
}
