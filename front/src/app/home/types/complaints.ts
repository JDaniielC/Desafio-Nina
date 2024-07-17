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
}

export type ComplaintsType = Complaint & User;

export interface GetComplaintsResponse {
  complaints: ComplaintsType[];
}

export interface ComplaintsTypeGroup {
  groping: number;
  stalking: number;
  unwanted_photos: number;
  unwanted_comments: number;
  threatening: number;
  flashing: number;
}

export interface ComplaintsGenderGroup {
  cis_male: number;
  cis_female: number;
  trans_male: number;
  trans_female: number;
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

export interface GetComplaintsNeighborhoodResponse {
  neighborhoods: ComplaintsNeighborhood[];
}


export const DEFAULT_COMPLAINTS_TYPE_GROUP: ComplaintsTypeGroup = {
  groping: 0,
  stalking: 0,
  unwanted_photos: 0,
  unwanted_comments: 0,
  threatening: 0,
  flashing: 0,
};

export const DEFAULT_COMPAINTS_GENDER_GROUP: ComplaintsGenderGroup = {
  cis_female: 0,
  cis_male: 0,
  other: 0,
  trans_female: 0,
  trans_male: 0
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
