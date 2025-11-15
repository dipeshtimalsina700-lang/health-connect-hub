import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceInput } from "@/components/ui/voice-input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctors";
import { DoctorCard } from "@/components/DoctorCard";
import { toast } from "sonner";

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [recommendations, setRecommendations] = useState<typeof mockDoctors>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms) {
      toast.error("Please describe your symptoms");
      return;
    }

    // Comprehensive symptom matching logic
    const symptomsLower = symptoms.toLowerCase();
    let recommended = mockDoctors;

    // Cardiology - Heart related
    if (symptomsLower.includes("heart") || symptomsLower.includes("chest pain") || 
        symptomsLower.includes("blood pressure") || symptomsLower.includes("cardiac") ||
        symptomsLower.includes("palpitation") || symptomsLower.includes("shortness of breath") ||
        symptomsLower.includes("cholesterol")) {
      recommended = mockDoctors.filter(d => d.specialization === "Cardiology");
    } 
    // Orthopedic - Bone and joint related
    else if (symptomsLower.includes("joint") || symptomsLower.includes("bone") || 
        symptomsLower.includes("fracture") || symptomsLower.includes("back pain") ||
        symptomsLower.includes("knee pain") || symptomsLower.includes("arthritis") ||
        symptomsLower.includes("spine") || symptomsLower.includes("muscle pain") ||
        symptomsLower.includes("sports injury")) {
      recommended = mockDoctors.filter(d => d.specialization === "Orthopedic");
    } 
    // Dermatology - Skin related
    else if (symptomsLower.includes("skin") || symptomsLower.includes("rash") || 
        symptomsLower.includes("acne") || symptomsLower.includes("eczema") ||
        symptomsLower.includes("allergy") || symptomsLower.includes("itching") ||
        symptomsLower.includes("hair loss") || symptomsLower.includes("psoriasis")) {
      recommended = mockDoctors.filter(d => d.specialization === "Dermatology");
    } 
    // Pediatrics - Child related
    else if (symptomsLower.includes("child") || symptomsLower.includes("baby") || 
        symptomsLower.includes("kid") || symptomsLower.includes("infant") ||
        symptomsLower.includes("vaccination")) {
      recommended = mockDoctors.filter(d => d.specialization === "Pediatrics");
    }
    // ENT - Ear, Nose, Throat
    else if (symptomsLower.includes("ear") || symptomsLower.includes("nose") || 
        symptomsLower.includes("throat") || symptomsLower.includes("hearing") ||
        symptomsLower.includes("sinus") || symptomsLower.includes("tonsil") ||
        symptomsLower.includes("voice") || symptomsLower.includes("snoring")) {
      recommended = mockDoctors.filter(d => d.specialization === "ENT");
    }
    // Neurology - Brain and nervous system
    else if (symptomsLower.includes("headache") || symptomsLower.includes("migraine") || 
        symptomsLower.includes("seizure") || symptomsLower.includes("epilepsy") ||
        symptomsLower.includes("nerve") || symptomsLower.includes("paralysis") ||
        symptomsLower.includes("tremor") || symptomsLower.includes("dizziness")) {
      recommended = mockDoctors.filter(d => d.specialization === "Neurology");
    }
    // Gastroenterology - Digestive system
    else if (symptomsLower.includes("stomach") || symptomsLower.includes("abdomen") || 
        symptomsLower.includes("digestion") || symptomsLower.includes("liver") ||
        symptomsLower.includes("constipation") || symptomsLower.includes("diarrhea") ||
        symptomsLower.includes("acidity") || symptomsLower.includes("ulcer") ||
        symptomsLower.includes("intestine")) {
      recommended = mockDoctors.filter(d => d.specialization === "Gastroenterology");
    }
    // Pulmonology - Respiratory system
    else if (symptomsLower.includes("cough") || symptomsLower.includes("breathing") || 
        symptomsLower.includes("asthma") || symptomsLower.includes("pneumonia") ||
        symptomsLower.includes("lung") || symptomsLower.includes("bronchitis") ||
        symptomsLower.includes("tuberculosis") || symptomsLower.includes("tb")) {
      recommended = mockDoctors.filter(d => d.specialization === "Pulmonology");
    }
    // Endocrinology - Hormonal and metabolic
    else if (symptomsLower.includes("diabetes") || symptomsLower.includes("thyroid") || 
        symptomsLower.includes("hormone") || symptomsLower.includes("weight") ||
        symptomsLower.includes("metabolism") || symptomsLower.includes("sugar")) {
      recommended = mockDoctors.filter(d => d.specialization === "Endocrinology");
    }
    // Urology - Urinary system
    else if (symptomsLower.includes("kidney") || symptomsLower.includes("bladder") || 
        symptomsLower.includes("urinary") || symptomsLower.includes("prostate") ||
        symptomsLower.includes("stone")) {
      recommended = mockDoctors.filter(d => d.specialization === "Urology");
    }
    // Ophthalmology - Eye related
    else if (symptomsLower.includes("eye") || symptomsLower.includes("vision") || 
        symptomsLower.includes("cataract") || symptomsLower.includes("glaucoma")) {
      recommended = mockDoctors.filter(d => d.specialization === "Ophthalmology");
    }

    setRecommendations(recommended);
    setSubmitted(true);
    toast.success("Analysis complete! Here are your recommended doctors.");
  };

  const handleReset = () => {
    setSymptoms("");
    setRecommendations([]);
    setSubmitted(false);
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
            <Button variant="outline" onClick={() => navigate("/doctors")}>
              Browse Doctors
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {!submitted ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Symptom Checker
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Tell us about your symptoms and we'll recommend the right specialists for you
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Describe Your Symptoms *</Label>
                    <VoiceInput
                      id="symptoms"
                      placeholder="Describe your symptoms in detail..."
                      value={symptoms}
                      onValueChange={(value) => setSymptoms(value)}
                      multiline
                      required
                      className="min-h-[150px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      Be as specific as possible about your symptoms for better doctor recommendations. You'll provide your personal details after selecting a doctor.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Find Recommended Doctors
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Recommended Doctors</h2>
              <p className="text-muted-foreground">Based on your symptoms</p>
            </div>

            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Your Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{symptoms}</p>
              </CardContent>
            </Card>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <Card className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  We couldn't find specific specialists for your symptoms. We recommend browsing all available doctors to find the right match.
                </p>
                <Button onClick={() => navigate("/doctors")}>
                  Browse All Doctors
                </Button>
              </Card>
            )}

            <div className="text-center mt-8 space-y-4">
              <p className="text-muted-foreground">
                Click "View Schedule & Book" on any doctor to provide your details and complete the booking
              </p>
              <div>
                <p className="text-muted-foreground mb-4">
                  Didn't find what you're looking for?
                </p>
                <Button variant="outline" onClick={() => navigate("/doctors")}>
                  Browse All Doctors
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={handleReset} variant="outline" size="lg">
                Submit Another Query
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
