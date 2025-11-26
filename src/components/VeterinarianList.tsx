import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Award, CheckCircle2, ArrowLeft, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VeterinarianMap from "./VeterinarianMap";

interface VeterinarianListProps {
  onSelectVet: (vetId: string) => void;
}

// Mock data for veterinarians
const mockVeterinarians = [
  {
    id: "1",
    name: "Dra. María González",
    specialty: "Emergencias y Cuidados Críticos",
    rating: 4.9,
    reviewCount: 127,
    distance: 0.8,
    responseTime: "3-5 min",
    equipment: ["Rayos X", "Ecografía", "Laboratorio"],
    availability: "Disponible ahora",
    badges: ["emergency", "verified", "specialist"],
    experience: "12 años",
  },
  {
    id: "2",
    name: "Dr. Carlos Rodríguez",
    specialty: "Medicina Interna y Cirugía",
    rating: 4.8,
    reviewCount: 98,
    distance: 1.2,
    responseTime: "5-8 min",
    equipment: ["Cirugía", "Rayos X", "Electrocardiograma"],
    availability: "Disponible ahora",
    badges: ["verified", "specialist"],
    experience: "8 años",
  },
  {
    id: "3",
    name: "Dra. Ana Martínez",
    specialty: "Emergencias y Cuidados Paliativos",
    rating: 5.0,
    reviewCount: 156,
    distance: 1.5,
    responseTime: "6-10 min",
    equipment: ["Ecografía", "Cuidados Paliativos", "Oxígeno"],
    availability: "Disponible ahora",
    badges: ["emergency", "verified", "specialist"],
    experience: "15 años",
  },
];

const VeterinarianList = ({ onSelectVet }: VeterinarianListProps) => {
  const [searchRadius, setSearchRadius] = useState(2);
  const { toast } = useToast();

  const handleSelectVet = (vetId: string, vetName: string) => {
    toast({
      title: "Veterinario seleccionado",
      description: `${vetName} ha sido notificado y se pondrá en contacto contigo.`,
    });
    onSelectVet(vetId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Veterinarios Disponibles</h1>
            <p className="text-lg text-muted-foreground">
              Encontramos {mockVeterinarians.length} veterinarios cerca de ti
            </p>
          </div>

          {/* Search Radius Info */}
          <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm">
              Buscando en un radio de <strong>{searchRadius} km</strong>
            </span>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-8">
          <VeterinarianMap />
        </div>

        {/* Veterinarian Cards */}
        <div className="space-y-6">
          {mockVeterinarians.map((vet) => (
            <div
              key={vet.id}
              className="card-elevated p-6 space-y-4 hover:scale-[1.01] transition-transform duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{vet.name}</h3>
                    <p className="text-muted-foreground">{vet.specialty}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {vet.badges.includes("emergency") && (
                      <span className="badge-emergency">
                        <Phone className="w-3 h-3" />
                        Emergencias
                      </span>
                    )}
                    {vet.badges.includes("verified") && (
                      <span className="badge-verified">
                        <CheckCircle2 className="w-3 h-3" />
                        Verificado
                      </span>
                    )}
                    {vet.badges.includes("specialist") && (
                      <span className="badge-specialist">
                        <Award className="w-3 h-3" />
                        Especialista
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex md:flex-col gap-4 md:gap-2 md:items-end">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold">{vet.rating}</span>
                    <span className="text-sm text-muted-foreground">({vet.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{vet.distance} km</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Tiempo de respuesta</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{vet.responseTime}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Experiencia</p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="font-medium">{vet.experience}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <span className="inline-flex items-center gap-1 text-success font-medium">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    {vet.availability}
                  </span>
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Equipamiento disponible</p>
                <div className="flex flex-wrap gap-2">
                  {vet.equipment.map((item) => (
                    <Badge key={item} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action */}
              <Button
                onClick={() => handleSelectVet(vet.id, vet.name)}
                className="w-full btn-primary-gradient mt-4"
              >
                <Phone className="w-4 h-4 mr-2" />
                Seleccionar Veterinario
              </Button>
            </div>
          ))}
        </div>

        {/* Expand Search */}
        <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center space-y-3">
          <p className="text-muted-foreground">¿No encuentras lo que buscas?</p>
          <Button
            variant="outline"
            onClick={() => setSearchRadius(searchRadius + 2)}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Ampliar búsqueda a {searchRadius + 2} km
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianList;
