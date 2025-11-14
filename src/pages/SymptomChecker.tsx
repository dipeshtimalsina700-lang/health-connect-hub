import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

    // Simple symptom matching logic
    const symptomsLower = formData.symptoms.toLowerCase();
    let recommended = mockDoctors;

    if (symptomsLower.includes("joint") || symptomsLower.includes("bone") || 
        symptomsLower.includes("fracture") || symptomsLower.includes("pain")) {
      recommended = mockDoctors.filter(d => d.specialization === "Orthopedic");
    } else if (symptomsLower.includes("heart") || symptomsLower.includes("chest") || 
               symptomsLower.includes("blood pressure")) {
      recommended = mockDoctors.filter(d => d.specialization === "Cardiology");
    } else if (symptomsLower.includes("skin") || symptomsLower.includes("rash") || 
               symptomsLower.includes("acne")) {
      recommended = mockDoctors.filter(d => d.specialization === "Dermatology");
    } else if (symptomsLower.includes("child") || symptomsLower.includes("baby") || 
               symptomsLower.includes("kid")) {
      recommended = mockDoctors.filter(d => d.specialization === "Pediatrics");
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
                HealthConnect
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
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Enter your age"
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
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms">Describe Your Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                    placeholder="Please describe your symptoms in detail (e.g., joint pain, skin rash, chest pain, etc.)"
                    rows={6}
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
