import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Complaint,
  ComplaintsAtMoment,
  ComplaintsAgeGroup,
  ComplaintsTypeGroup,
  ComplaintsMonthGroup,
  GetComplaintsResponse,
  ComplaintsGenderGroup,
  ComplaintsNeighborhood,
  GetComplaintsAtMomentResponse,
  getComplaintsTypeGroupResponse,
  GetComplaintsMonthGroupResponse,
  GetComplaintsGenderGroupResponse,
} from '../types/complaints';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(readonly http: HttpClient) { }

  getComplaints() {
    return this.http.get<GetComplaintsResponse>(
      '/api/complaints'
    ).pipe(first(), map((response) => response.complaints))
  }

  getComplaint(id: string) {
    return this.http.get<Complaint>(`/api/complaints/${id}`).pipe(first())
  }

  getComplaintsTypeGroup() {
    return this.http.get<getComplaintsTypeGroupResponse>(
      '/api/complaints/group/types'
    ).pipe(map((res): ComplaintsTypeGroup => {
      const newReturn: ComplaintsTypeGroup = {
        flashing: res.FLASHING,
        groping: res.GROPING,
        stalking: res.STALKING,
        threatening: res.THREATENING,
        unwantedComments: res.UNWANTED_COMMENTS,
        unwantedPhotos: res.UNWANTED_PHOTOS
      }

      return newReturn
    }), first())
  }

  getComplaintsGenderGroup() {
    return this.http.get<GetComplaintsGenderGroupResponse>(
      '/api/complaints/group/genders'
    ).pipe(map((response): ComplaintsGenderGroup => {
      const { CIS_MALE, CIS_FEMALE, TRANS_MALE, TRANS_FEMALE, OTHER } = response
      const newReturn: ComplaintsGenderGroup = {
        cisMale: CIS_MALE,
        cisFemale: CIS_FEMALE,
        transMale: TRANS_MALE,
        transFemale: TRANS_FEMALE,
        other: OTHER
      }

      return newReturn
    }), first())
  }

  getComplaintsAgeGroup() {
    return this.http.get<any>(
      '/api/complaints/group/age_group'
    ).pipe(first(), map(res => {
      const newReturn: ComplaintsAgeGroup = {
        under_14: res['< 14'],
        from_14_to_18: res['14 - 18'],
        from_19_to_29: res['19 - 29'],
        from_30_to_39: res['30 - 39'],
        from_40_to_49: res['40 - 49'],
        from_50_to_59: res['50 - 59'],
        above_60: res['> 60']
      }
      return newReturn
    }))
  }

  getComplaintsAtMoment() {
    return this.http.get<GetComplaintsAtMomentResponse>(
      '/api/complaints/group/at_moment'
    ).pipe(map((response): ComplaintsAtMoment => {
      const newReturn: ComplaintsAtMoment = {
        true: response.True,
        false: response.False
      }

      return newReturn
    }), first())
  }

  getComplaintsMonthGroup() {
    return this.http.get<GetComplaintsMonthGroupResponse>(
      '/api/complaints/group/months'
    ).pipe(map((response): ComplaintsMonthGroup => {
      const newReturn: ComplaintsMonthGroup = {
        jan: response.Jan,
        feb: response.Fev,
        mar: response.Mar,
        apr: response.Abr,
        may: response.Mai,
        jun: response.Jun,
        jul: response.Jul,
        aug: response.Ago,
        sep: response.Set,
        oct: response.Out,
        nov: response.Nov,
        dec: response.Dez
      }

      return newReturn
    }), first())
  }

  getComplaintsNeighborhoodGroup() {
    return this.http.get<ComplaintsNeighborhood[]>(
      'api/complaints/group/neighborhoods'
    ).pipe(first())
  }
}
