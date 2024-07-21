export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  gender: string;
  ethnicity: string;
  birthdate: string;
}

export interface GetUsersResponse {
  users: User[];
}
