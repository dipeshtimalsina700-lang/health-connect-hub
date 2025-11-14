import { Doctor } from "@/types";

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Orthopedic",
    qualifications: "MBBS, MS (Orthopedics), FRCS",
    experience: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    about: "Specialized in joint replacement surgery and sports injuries with over 15 years of experience.",
    languages: ["English", "Spanish"],
    schedules: [
      {
        hospitalId: "h1",
        hospitalName: "Tribhuvan University Teaching Hospital",
        hospitalAddress: "Maharajgunj, Kathmandu",
        consultationFee: 1500,
        availableDays: ["Monday", "Wednesday", "Friday"],
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", available: true },
          { startTime: "10:00", endTime: "11:00", available: true },
          { startTime: "11:00", endTime: "12:00", available: false },
          { startTime: "14:00", endTime: "15:00", available: true },
        ]
      },
      {
        hospitalId: "h2",
        hospitalName: "Grande International Hospital",
        hospitalAddress: "Dhapasi, Kathmandu",
        consultationFee: 2000,
        availableDays: ["Tuesday", "Thursday"],
        timeSlots: [
          { startTime: "10:00", endTime: "11:00", available: true },
          { startTime: "11:00", endTime: "12:00", available: true },
          { startTime: "15:00", endTime: "16:00", available: true },
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Orthopedic",
    qualifications: "MBBS, DNB (Orthopedics)",
    experience: 12,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    about: "Expert in spine surgery and minimally invasive orthopedic procedures.",
    languages: ["English", "Mandarin"],
    schedules: [
      {
        hospitalId: "h1",
        hospitalName: "Tribhuvan University Teaching Hospital",
        hospitalAddress: "Maharajgunj, Kathmandu",
        consultationFee: 1400,
        availableDays: ["Monday", "Tuesday", "Thursday"],
        timeSlots: [
          { startTime: "08:00", endTime: "09:00", available: true },
          { startTime: "09:00", endTime: "10:00", available: true },
          { startTime: "16:00", endTime: "17:00", available: true },
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Dr. Emily Williams",
    specialization: "Cardiology",
    qualifications: "MBBS, MD (Cardiology), FACC",
    experience: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    about: "Leading cardiologist specializing in interventional cardiology and heart failure management.",
    languages: ["English", "French"],
    schedules: [
      {
        hospitalId: "h2",
        hospitalName: "Grande International Hospital",
        hospitalAddress: "Dhapasi, Kathmandu",
        consultationFee: 2500,
        availableDays: ["Monday", "Wednesday", "Friday"],
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", available: true },
          { startTime: "10:00", endTime: "11:00", available: false },
          { startTime: "13:00", endTime: "14:00", available: true },
          { startTime: "14:00", endTime: "15:00", available: true },
        ]
      },
      {
        hospitalId: "h3",
        hospitalName: "Nepal Mediciti Hospital",
        hospitalAddress: "Bhaisepati, Lalitpur",
        consultationFee: 2800,
        availableDays: ["Tuesday", "Thursday"],
        timeSlots: [
          { startTime: "11:00", endTime: "12:00", available: true },
          { startTime: "15:00", endTime: "16:00", available: true },
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Dr. James Taylor",
    specialization: "Dermatology",
    qualifications: "MBBS, MD (Dermatology)",
    experience: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    about: "Expert in cosmetic dermatology and treatment of skin conditions.",
    languages: ["English"],
    schedules: [
      {
        hospitalId: "h3",
        hospitalName: "Nepal Mediciti Hospital",
        hospitalAddress: "Bhaisepati, Lalitpur",
        consultationFee: 1300,
        availableDays: ["Monday", "Wednesday", "Thursday", "Friday"],
        timeSlots: [
          { startTime: "10:00", endTime: "11:00", available: true },
          { startTime: "11:00", endTime: "12:00", available: true },
          { startTime: "14:00", endTime: "15:00", available: true },
          { startTime: "15:00", endTime: "16:00", available: false },
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    qualifications: "MBBS, MD (Pediatrics), FIAP",
    experience: 14,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1609958299038-75c85ad15e4b?w=400&h=400&fit=crop",
    about: "Compassionate pediatrician with expertise in child healthcare and development.",
    languages: ["English", "Hindi"],
    schedules: [
      {
        hospitalId: "h1",
        hospitalName: "Tribhuvan University Teaching Hospital",
        hospitalAddress: "Maharajgunj, Kathmandu",
        consultationFee: 1200,
        availableDays: ["Tuesday", "Wednesday", "Friday"],
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", available: true },
          { startTime: "10:00", endTime: "11:00", available: true },
          { startTime: "11:00", endTime: "12:00", available: true },
          { startTime: "16:00", endTime: "17:00", available: true },
        ]
      }
    ]
  },
  {
    id: "6",
    name: "Dr. Robert Martinez",
    specialization: "Orthopedic",
    qualifications: "MBBS, MS (Orthopedics)",
    experience: 9,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    about: "Specializes in trauma surgery and fracture management.",
    languages: ["English", "Spanish"],
    schedules: [
      {
        hospitalId: "h2",
        hospitalName: "Grande International Hospital",
        hospitalAddress: "Dhapasi, Kathmandu",
        consultationFee: 1600,
        availableDays: ["Monday", "Thursday", "Saturday"],
        timeSlots: [
          { startTime: "08:00", endTime: "09:00", available: true },
          { startTime: "13:00", endTime: "14:00", available: true },
          { startTime: "14:00", endTime: "15:00", available: true },
        ]
      }
    ]
  }
];
