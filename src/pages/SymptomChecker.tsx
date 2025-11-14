import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceInput } from "@/components/ui/voice-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctors";
import { DoctorCard } from "@/components/DoctorCard";
import { toast } from "sonner";

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    symptoms: ""
  });
  const [recommendations, setRecommendations] = useState<typeof mockDoctors>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.symptoms) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Comprehensive symptom matching logic
    const symptomsLower = formData.symptoms.toLowerCase();
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
    // Ophthalmology - Eye related
    else if (symptomsLower.includes("eye") || symptomsLower.includes("vision") || 
        symptomsLower.includes("cataract") || symptomsLower.includes("glasses") ||
        symptomsLower.includes("blind") || symptomsLower.includes("sight")) {
      recommended = mockDoctors.filter(d => d.specialization === "Ophthalmology");
    }
    // Gynecology - Women's health
    else if (symptomsLower.includes("pregnancy") || symptomsLower.includes("period") || 
        symptomsLower.includes("menstrual") || symptomsLower.includes("gynec") ||
        symptomsLower.includes("ovary") || symptomsLower.includes("uterus") ||
        symptomsLower.includes("women") || symptomsLower.includes("female")) {
      recommended = mockDoctors.filter(d => d.specialization === "Gynecology");
    }
    // Pulmonology - Respiratory/Lung related
    else if (symptomsLower.includes("lung") || symptomsLower.includes("breathing") || 
        symptomsLower.includes("asthma") || symptomsLower.includes("cough") ||
        symptomsLower.includes("bronchitis") || symptomsLower.includes("pneumonia") ||
        symptomsLower.includes("respiratory")) {
      recommended = mockDoctors.filter(d => d.specialization === "Pulmonology");
    }

    setRecommendations(recommended.slice(0, 3));
    setSubmitted(true);
    toast.success("Recommendations generated based on your symptoms");
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
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                onClick={() => navigate("/doctors")}
                className="text-foreground hover:text-primary"
              >
                Browse Doctors
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Symptom Checker</h1>
          <p className="text-xl text-muted-foreground">
            Not sure which doctor to consult? Tell us about your symptoms and we'll recommend the right specialists.
          </p>
        </div>

        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <VoiceInput
                      id="name"
                      value={formData.name}
                      onValueChange={(value) => setFormData({...formData, name: value})}
                      placeholder="Enter or speak your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <VoiceInput
                      id="age"
                      type="number"
                      value={formData.age}
                      onValueChange={(value) => setFormData({...formData, age: value})}
                      placeholder="Enter or speak your age"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select 
                    value={formData.gender}
                    onValueChange={(value) => setFormData({...formData, gender: value})}
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
                  <Label htmlFor="address">Address</Label>
                  <VoiceInput
                    id="address"
                    value={formData.address}
                    onValueChange={(value) => setFormData({...formData, address: value})}
                    placeholder="Enter or speak your address"
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms">Describe Your Symptoms *</Label>
                  <VoiceInput
                    id="symptoms"
                    multiline
                    value={formData.symptoms}
                    onValueChange={(value) => setFormData({...formData, symptoms: value})}
                    placeholder="E.g., I have a persistent headache and feel dizzy..."
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                  size="lg"
                >
                  Get Doctor Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Age:</span> {formData.age} years</p>
                  <p><span className="font-medium">Gender:</span> {formData.gender}</p>
                  {formData.address && <p><span className="font-medium">Address:</span> {formData.address}</p>}
                </div>
                <div className="mt-4">
                  <p className="font-medium text-sm mb-1">Symptoms:</p>
                  <p className="text-sm text-muted-foreground">{formData.symptoms}</p>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-6">Recommended Doctors</h2>
              {recommendations.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Based on your symptoms, we recommend consulting with any of our qualified doctors.
                    </p>
                    <Button onClick={() => navigate("/doctors")}>
                      Browse All Doctors
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <Button 
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setFormData({name: "", age: "", gender: "", address: "", symptoms: ""});
              }}
              className="w-full"
            >
              Submit Another Query
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
