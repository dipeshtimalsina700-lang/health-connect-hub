import { Doctor } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const specialtyColorMap: Record<string, "cardiology" | "orthopedic" | "dermatology" | "neurology" | "ent" | "gastroenterology" | "ophthalmology" | "gynecology" | "pulmonology" | "secondary"> = {
  Cardiology: "cardiology",
  Orthopedics: "orthopedic",
  Dermatology: "dermatology",
  Neurology: "neurology",
  ENT: "ent",
  Gastroenterology: "gastroenterology",
  Ophthalmology: "ophthalmology",
  Gynecology: "gynecology",
  Pulmonology: "pulmonology",
};

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border/50 bg-gradient-card">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground break-words line-clamp-2">{doctor.qualifications}</p>
          </div>
          
          <div>
            <Badge 
              variant={specialtyColorMap[doctor.specialization] || "secondary"}
              className="text-xs"
            >
              {doctor.specialization}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{doctor.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{doctor.experience} years</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{doctor.schedules.length} hospital{doctor.schedules.length > 1 ? 's' : ''}</span>
          </div>
          
          <p className="text-sm text-muted-foreground">From Rs. {doctor.schedules[0].consultationFee}/consultation</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => navigate(`/doctor/${doctor.id}`)}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium hover:scale-[1.02] transition-all text-primary-foreground"
        >
          View Schedule & Book
        </Button>
      </CardFooter>
    </Card>
  );
};
