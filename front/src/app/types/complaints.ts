import { User } from "./user";

export interface Complaint {
  id: string,
  user_id: string,
  date: string,
  at_moment: true,
  type: string,
  neighborhood: string,
  situation: string,
  description: string,
  created_at: string,
  updated_at: string,

  user: User
}

export interface ComplaintsTypeGroup {
  groping: number;
  stalking: number;
  unwantedPhotos: number;
  unwantedComments: number;
  threatening: number;
  flashing: number;
}

export interface ComplaintsGenderGroup {
  cisMale: number;
  cisFemale: number;
  transMale: number;
  transFemale: number;
  other: number;
}

export interface ComplaintsAgeGroup {
  under_14: number;
  from_14_to_18: number;
  from_19_to_29: number;
  from_30_to_39: number;
  from_40_to_49: number;
  from_50_to_59: number;
  above_60: number;
}

export interface ComplaintsAtMoment {
  true: number;
  false: number;
}

export interface ComplaintsMonthGroup {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

export interface ComplaintsNeighborhood {
  name: string;
  count: number;
}

// Responses from API

export interface GetComplaintResponse extends Complaint {
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_created_at: string;
  user_updated_at: string;
  user_gender: string;
  user_ethnicity: string;
  user_birthdate: string;
}

export interface GetComplaintsResponse {
  complaints: GetComplaintResponse[];
}

export interface GetComplaintsGenderGroupResponse {
  CIS_MALE: number;
  CIS_FEMALE: number;
  TRANS_MALE: number;
  TRANS_FEMALE: number;
  OTHER: number;
}

export interface getComplaintsTypeGroupResponse {
  GROPING: number;
  STALKING: number;
  UNWANTED_PHOTOS: number;
  UNWANTED_COMMENTS: number;
  THREATENING: number;
  FLASHING: number;
}

export interface GetComplaintsMonthGroupResponse {
  Jan: number;
  Fev: number;
  Mar: number;
  Abr: number;
  Mai: number;
  Jun: number;
  Jul: number;
  Ago: number;
  Set: number;
  Out: number;
  Nov: number;
  Dez: number;
}

export interface GetComplaintsAtMomentResponse {
  True: number;
  False: number;
}

// Default values to State

export const DEFAULT_COMPLAINTS_TYPE_GROUP: ComplaintsTypeGroup = {
  groping: 0,
  stalking: 0,
  unwantedPhotos: 0,
  unwantedComments: 0,
  threatening: 0,
  flashing: 0,
};

export const DEFAULT_COMPAINTS_GENDER_GROUP: ComplaintsGenderGroup = {
  cisMale: 0,
  cisFemale: 0,
  transMale: 0,
  transFemale: 0,
  other: 0,
};

export const DEFAULT_COMPLAINTS_AGE_GROUP: ComplaintsAgeGroup = {
  above_60: 0,
  from_14_to_18: 0,
  from_19_to_29: 0,
  from_30_to_39: 0,
  from_40_to_49: 0,
  from_50_to_59: 0,
  under_14: 0,
};

export const DEFAULT_MONTH_GROUP: ComplaintsMonthGroup = {
  jan: 0,
  feb: 0,
  mar: 0,
  apr: 0,
  may: 0,
  jun: 0,
  jul: 0,
  aug: 0,
  sep: 0,
  oct: 0,
  nov: 0,
  dec: 0,
};
