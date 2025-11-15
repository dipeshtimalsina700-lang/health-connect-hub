import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CheckCircle, Calendar, Clock, MapPin, User, DollarSign } from "lucide-react";

const BookingConfirmation = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
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
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-4">
            <CheckCircle className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your Token Number</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {token}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p className="font-semibold text-lg">{bookingData.doctorName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hospital</p>
                  <p className="font-semibold">{bookingData.hospitalName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{bookingData.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Slot</p>
                  <p className="font-semibold">{bookingData.timeSlot}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consultation Fee</p>
                  <p className="font-semibold text-lg">Rs. {bookingData.fee}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-semibold">{bookingData.patientName}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Please arrive 15 minutes before your scheduled appointment time. 
                Bring a valid ID and your token number for check-in.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="flex-1"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => navigate("/doctors")}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
