import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Shield, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Easy Appointment Booking",
      description: "Book appointments with top doctors across multiple hospitals in just a few clicks."
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Access a network of highly qualified and experienced healthcare professionals."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Choose from various time slots that fit your schedule across different locations."
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All our doctors are verified and licensed healthcare practitioners."
    },
    {
      icon: Heart,
      title: "Symptom Checker",
      description: "Not sure which doctor to see? Our AI helps match you with the right specialist."
    },
    {
      icon: Award,
      title: "Quality Care",
      description: "Connect with top-rated doctors and get the best healthcare experience."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                Find Doctors
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/symptom-checker")}
                className="text-foreground hover:text-secondary"
              >
                Symptom Checker
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Health,
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with top healthcare professionals across multiple hospitals. 
                Book appointments easily and get the care you deserve.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate("/doctors")}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow hover:scale-[1.02] transition-all text-primary-foreground"
                >
                  Find a Doctor
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/symptom-checker")}
                  className="border-2 border-primary/50 hover:bg-primary/5 hover:border-primary transition-all"
                >
                  Check Symptoms
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-3xl animate-pulse" />
              <img 
                src={heroImage}
                alt="Healthcare professionals"
                className="relative rounded-3xl shadow-glow w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CareSync?</h2>
            <p className="text-xl text-muted-foreground">
              Experience healthcare booking made simple and efficient
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border/50 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-soft">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of patients who trust CareSync for their healthcare needs
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/doctors")}
              className="bg-gradient-to-r from-primary via-primary-glow to-secondary hover:shadow-glow hover:scale-[1.02] transition-all text-white"
            >
              Browse Doctors Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 CareSync. Your trusted healthcare partner.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
