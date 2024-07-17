import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Complaint,
  ComplaintsAgeGroup,
  ComplaintsAtMoment,
  ComplaintsGenderGroup,
  ComplaintsMonthGroup,
  ComplaintsNeighborhood,
  ComplaintsType,
  ComplaintsTypeGroup,
  DEFAULT_COMPAINTS_GENDER_GROUP,
  DEFAULT_COMPLAINTS_AGE_GROUP,
  DEFAULT_COMPLAINTS_TYPE_GROUP,
  DEFAULT_MONTH_GROUP
} from '../types/complaints';

@Injectable()
export class HomeState {
  constructor() {}

  private readonly complaintsList = new BehaviorSubject<ComplaintsType[]>([]);

  private readonly complaintsTypeGroup = new BehaviorSubject<ComplaintsTypeGroup>(
    DEFAULT_COMPLAINTS_TYPE_GROUP
  );

  private readonly complaintsGenderGroup = new BehaviorSubject<ComplaintsGenderGroup
  >(
    DEFAULT_COMPAINTS_GENDER_GROUP
  );

  private readonly complaintsAgeGroup = new BehaviorSubject<ComplaintsAgeGroup>(
    DEFAULT_COMPLAINTS_AGE_GROUP
  );

  private readonly complaintsAtMoment = new BehaviorSubject<ComplaintsAtMoment>({
    false: 0,
    true: 0,
  });

  private readonly complaintsMonthGroup = new BehaviorSubject<ComplaintsMonthGroup>(
    DEFAULT_MONTH_GROUP
  );

  private readonly complaintsNeighborhood = new BehaviorSubject<ComplaintsNeighborhood[]>(
    []
  );

  private readonly complaint = new BehaviorSubject<Complaint | null>(null);

  getComplaint() {
    return this.complaint.asObservable();
  }

  setComplaint(complaint: Complaint) {
    this.complaint.next(complaint);
  }

  getComplaintsList() {
    return this.complaintsList.asObservable();
  }

  setComplaintsList(complaints: ComplaintsType[]) {
    this.complaintsList.next(complaints);
  }

  getComplaintsTypeGroup() {
    return this.complaintsTypeGroup.asObservable();
  }

  setComplaintsTypeGroup(group: ComplaintsTypeGroup) {
    this.complaintsTypeGroup.next(group);
  }

  getComplaintsGenderGroup() {
    return this.complaintsGenderGroup.asObservable();
  }

  setComplaintsGenderGroup(group: ComplaintsGenderGroup) {
    this.complaintsGenderGroup.next(group);
  }

  getComplaintsAgeGroup() {
    return this.complaintsAgeGroup.asObservable();
  }

  setComplaintsAgeGroup(group: ComplaintsAgeGroup) {
    this.complaintsAgeGroup.next(group);
  }

  getComplaintsAtMoment() {
    return this.complaintsAtMoment.asObservable();
  }

  setComplaintsAtMoment(group: ComplaintsAtMoment) {
    this.complaintsAtMoment.next(group);
  }

  getComplaintsMonthGroup() {
    return this.complaintsMonthGroup.asObservable();
  }

  setComplaintsMonthGroup(group: ComplaintsMonthGroup) {
    this.complaintsMonthGroup.next(group);
  }

  getComplaintsNeighborhood() {
    return this.complaintsNeighborhood.asObservable();
  }

  setComplaintsNeighborhood(neighborhoods: ComplaintsNeighborhood[]) {
    this.complaintsNeighborhood.next(neighborhoods);
  }
}
