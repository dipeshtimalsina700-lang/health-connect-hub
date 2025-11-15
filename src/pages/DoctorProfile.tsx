import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockDoctors } from "@/data/mockDoctors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VoiceInput } from "@/components/ui/voice-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, MapPin, Clock, Calendar, ArrowLeft, CheckCircle, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = mockDoctors.find(d => d.id === id);

  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: ""
  });

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Doctor not found</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (!bookingData.patientName || !bookingData.age || !bookingData.gender || !bookingData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select appointment date");
      return;
    }
    if (selectedSchedule === null || !selectedTimeSlot) {
      toast.error("Please select hospital and time slot first");
      return;
    }

    const schedule = doctor.schedules[selectedSchedule];
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    
    toast.success("Appointment booked successfully!");
    navigate(`/booking-confirmation/${token}`, {
      state: {
        token,
        doctorName: doctor.name,
        hospitalName: schedule.hospitalName,
        date: format(selectedDate, "PPP"),
        timeSlot: selectedTimeSlot,
        fee: schedule.consultationFee,
        patientName: bookingData.patientName
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CareSync
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/doctors")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
        </Button>

        {/* Doctor Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="aspect-square overflow-hidden rounded-2xl mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-muted-foreground mb-4">{doctor.qualifications}</p>
              <Badge className="mb-4 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                {doctor.specialization}
              </Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{doctor.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.experience} years experience</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{doctor.about}</p>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-semibold">Languages:</span> {doctor.languages.join(", ")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Schedules */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Schedule & Consultation Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {doctor.schedules.map((schedule, index) => (
                  <Card 
                    key={index}
                    className={`border-2 transition-all cursor-pointer ${
                      selectedSchedule === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSchedule(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{schedule.hospitalName}</h4>
                          <div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{schedule.hospitalAddress}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg font-semibold">
                          Rs. {schedule.consultationFee}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Available Days:</p>
                        <div className="flex flex-wrap gap-2">
                          {schedule.availableDays.map(day => (
                            <Badge key={day} variant="secondary" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedSchedule === index && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-2">Available Time Slots:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {schedule.timeSlots.map((slot, slotIndex) => (
                              <Button
                                key={slotIndex}
                                variant={selectedTimeSlot === `${slot.startTime}-${slot.endTime}` ? "default" : "outline"}
                                size="sm"
                                disabled={!slot.available}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTimeSlot(`${slot.startTime}-${slot.endTime}`);
                                }}
                                className="text-xs"
                              >
                                {slot.startTime} - {slot.endTime}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {selectedSchedule !== null && selectedTimeSlot && (
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                    size="lg"
                  >
                    Proceed to Book
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name *</Label>
                <VoiceInput
                  id="patientName"
                  value={bookingData.patientName}
                  onValueChange={(value) => setBookingData({...bookingData, patientName: value})}
                  placeholder="Enter or speak patient name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <VoiceInput
                  id="age"
                  type="number"
                  value={bookingData.age}
                  onValueChange={(value) => setBookingData({...bookingData, age: value})}
                  placeholder="Enter or speak age"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select 
                value={bookingData.gender}
                onValueChange={(value) => setBookingData({...bookingData, gender: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <VoiceInput
                id="phone"
                type="tel"
                value={bookingData.phone}
                onValueChange={(value) => setBookingData({...bookingData, phone: value})}
                placeholder="Enter or speak phone number"
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Appointment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm"><span className="font-semibold">Doctor:</span> {doctor.name}</p>
              <p className="text-sm"><span className="font-semibold">Hospital:</span> {selectedSchedule !== null && doctor.schedules[selectedSchedule].hospitalName}</p>
              <p className="text-sm"><span className="font-semibold">Time:</span> {selectedTimeSlot}</p>
              <p className="text-sm"><span className="font-semibold">Consultation Fee:</span> ${selectedSchedule !== null && doctor.schedules[selectedSchedule].consultationFee}</p>
            </div>

            <Button 
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
            >
              Confirm & Pay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorProfile;
