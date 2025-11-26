import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Shield, Clock, Heart, Stethoscope } from "lucide-react";
import EmergencyRequestModal from "@/components/EmergencyRequestModal";
import VeterinarianList from "@/components/VeterinarianList";
import AIAssistantChat from "@/components/AIAssistantChat";
import heroImage from "@/assets/hero-vet.jpg";

const Index = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedVet, setSelectedVet] = useState<string | null>(null);
  const [mainPage, setMainPage] = useState<string | null>(null);

  const handleEmergencyRequest = (description: string, petInfo: any) => {
    console.log("Emergency requested:", description, petInfo);
    setEmergencyActive(true);
    setShowEmergencyModal(false);
  };

  const handleVetSelect = (vetId: string) => {
    setSelectedVet(vetId);
    setMainPage(vetId);
  };

  if (emergencyActive && !selectedVet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <VeterinarianList
          onSelectVet={handleVetSelect}
          onBack={() => {
            setEmergencyActive(false);
            setSelectedVet(null);
          }}
        />
      </div>
    );
  }

  if (selectedVet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <AIAssistantChat
          vetId={selectedVet}
          onBack={() => {
            setSelectedVet(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Veterinarian with pet" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Heart className="w-4 h-4 fill-current" />
              <span>Asistencia veterinaria 24/7</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Emergencias Veterinarias
              </span>
              <br />
              <span className="text-foreground">En Minutos</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Conectamos a tu mascota con veterinarios profesionales cercanos. 
              Atención inmediata cuando más la necesitas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
              <Button 
                onClick={() => setShowEmergencyModal(true)}
                className="btn-emergency text-lg h-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Solicitar Ayuda de Emergencia
              </Button>
              {/* <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver Veterinarios Cercanos
              </Button> */}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <div className="card-elevated p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Respuesta Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Veterinarios disponibles en tu zona responden en minutos
                </p>
              </div>

              <div className="card-elevated p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-lg">Profesionales Verificados</h3>
                <p className="text-sm text-muted-foreground">
                  Todos los veterinarios están certificados y verificados
                </p>
              </div>

              <div className="card-elevated p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Asistencia con IA</h3>
                <p className="text-sm text-muted-foreground">
                  Guía inteligente mientras esperas al veterinario
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmergencyRequestModal 
        open={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onSubmit={handleEmergencyRequest}
      />
    </div>
  );
};

export default Index;
