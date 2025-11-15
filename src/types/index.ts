export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experience: number;
  rating: number;
  image: string;
  about: string;
  languages: string[];
  schedules: DoctorSchedule[];
}

export interface DoctorSchedule {
  hospitalId: string;
  hospitalName: string;
  hospitalAddress: string;
  consultationFee: number;
  availableDays: string[];
  timeSlots: TimeSlot[];
  hasInsurance: boolean;
  isGovernmentHospital: boolean;
  isOnLeave?: boolean;
  leaveReason?: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface SymptomFormData {
  name: string;
  age: number;
  gender: string;
  address: string;
  symptoms: string;
}

export interface BookingFormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  hasInsurance: boolean;
}

export interface Booking {
  token: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  timeSlot: string;
  fee: number;
  patientName: string;
}
