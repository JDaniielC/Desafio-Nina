import { Injectable } from '@angular/core';
import { State } from './state/state';
import { ComplaintsService } from './services/complaints.service';
import { GetComplaintsRequest } from './types/complaints';

@Injectable({
  providedIn: 'root'
})
export class Facade {
  constructor(
    readonly state: State,
    readonly complaintsService: ComplaintsService
  ) { }

  getComplaintsList() {
    return this.state.getComplaintsList();
  }

  getComplaintsTypeGroup() {
    return this.state.getComplaintsTypeGroup();
  }

  getComplaintsGenderGroup() {
    return this.state.getComplaintsGenderGroup();
  }

  getComplaintsAgeGroup() {
    return this.state.getComplaintsAgeGroup();
  }

  getComplaintsAtMoment() {
    return this.state.getComplaintsAtMoment();
  }

  getComplaintsMonthGroup() {
    return this.state.getComplaintsMonthGroup();
  }

  getComplaintsNeighborhood() {
    return this.state.getComplaintsNeighborhood();
  }

  getComplaint() {
    return this.state.getComplaint();
  }

  getLoading() {
    return this.state.getLoading();
  }

  setLoading(loading: boolean) {
    this.state.setLoading(loading);
  }

  fetchAllComplaints() {
    this.complaintsService.getComplaints().subscribe(res => {
      this.state.setComplaintsList(res);
    }),
    this.complaintsService.getComplaintsTypeGroup().subscribe(res => {
      this.state.setComplaintsTypeGroup(res);
    }),
    this.complaintsService.getComplaintsGenderGroup().subscribe(res => {
      this.state.setComplaintsGenderGroup(res);
    }),
    this.complaintsService.getComplaintsAgeGroup().subscribe(res => {
      this.state.setComplaintsAgeGroup(res);
    }),
    this.complaintsService.getComplaintsAtMoment().subscribe(res => {
      this.state.setComplaintsAtMoment(res);
    }),
    this.complaintsService.getComplaintsMonthGroup().subscribe(res => {
      this.state.setComplaintsMonthGroup(res);
    }),
    this.complaintsService.getComplaintsNeighborhoodGroup().subscribe(res => {
      this.state.setComplaintsNeighborhood(res);
    })
  }

  fetchComplaints(dates?: GetComplaintsRequest) {
    this.complaintsService.getComplaints(dates).subscribe(res => {
      this.state.setComplaintsList(res);
    });
  }

  fetchComplaint(id: string) {
    this.complaintsService.getComplaint(id).subscribe((response) => {
      if (!response) {
        return;
      }

      this.state.setComplaint(response);
    });
  }
}
