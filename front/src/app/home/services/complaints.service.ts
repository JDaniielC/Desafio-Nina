import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint, ComplaintsAgeGroup, ComplaintsAtMoment, ComplaintsGenderGroup, ComplaintsMonthGroup, ComplaintsTypeGroup, GetComplaintsNeighborhoodResponse, GetComplaintsResponse } from '../types/complaints';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(readonly http: HttpClient) { }

  getComplaints() {
    return this.http.get<GetComplaintsResponse>('/api/complaints')

  }

  getComplaint(id: string) {
    return this.http.get<Complaint>(`/api/complaints/${id}`)

  }

  getComplaintsTypeGroup() {
    return this.http.get<ComplaintsTypeGroup>('/api/complaints/group/types')

  }

  getComplaintsGenderGroup() {
    return this.http.get<ComplaintsGenderGroup>('/api/complaints/group/genders')

  }

  getComplaintsAgeGroup() {
    return this.http.get<ComplaintsAgeGroup>('/api/complaints/group/age_group')

  }

  getComplaintsAtMoment() {
    return this.http.get<ComplaintsAtMoment>('/api/complaints/group/at_moment')

  }

  getComplaintsMonthGroup() {
    return this.http.get<ComplaintsMonthGroup>('/api/complaints/group/months')

  }

  getComplaintsNeighborhoodGroup() {
    return this.http.get<GetComplaintsNeighborhoodResponse>(
      'api/complaints/group/neighborhoods'
    )
  }
}
