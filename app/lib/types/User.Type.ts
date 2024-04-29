
export type UserType = {
  id: number;
  username: string;
  fullname: string;
  role: string;
  status: string;
  companies: Company;
};

export type Company = {
  companyId: number
  companyName: string
  address: string
  email: string
  contact: string
  phone: string
  website: string
  description: string
}


export type UserListType = {
  id: number
  username: string
  fullname: string
  profile: string
  companyId: number
  companyName: string
}

export type UserInfoType = {
  id: number;
  username: string;
  fullname: string;
  password: string;
  profile: string;
  status: boolean;
  companies: Company;
  role: string;
  deviceToken: string;
};

// export type Company = {
//   createdBy: string;
//   modifiedBy: string;
//   createdAt: string;
//   modifiedAt: string;
//   companyId: number;
//   companyName: string;
//   address: string;
//   email: string;
//   contact: string;
//   phone: string;
//   website: string;
//   description: string;
// };
