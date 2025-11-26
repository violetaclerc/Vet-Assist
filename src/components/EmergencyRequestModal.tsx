import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EmergencyRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (description: string, petInfo: any) => void;
}

const EmergencyRequestModal = ({ open, onClose, onSubmit }: EmergencyRequestModalProps) => {
  const [description, setDescription] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !petName.trim() || !petType || !petAge.trim()) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(description, { petName, petType, petAge });
      setIsSubmitting(false);
      
      // Reset form
      setDescription("");
      setPetName("");
      setPetType("");
      setPetAge("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-secondary" />
            Solicitud de Emergencia
          </DialogTitle>
          <DialogDescription className="text-base">
            Completa la información para conectarte rápidamente con un veterinario cercano.
            Mientras tanto, recibirás orientación de nuestro asistente de IA.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Pet Information */}
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold text-lg">Información de tu Mascota</h3>
            
            <div className="space-y-2">
              <Label htmlFor="petName">Nombre de la mascota</Label>
              <Input
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ej: Max"
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petType">Tipo de animal</Label>
                <Select value={petType} onValueChange={setPetType}>
                  <SelectTrigger id="petType" className="bg-background">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Perro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="bird">Ave</SelectItem>
                    <SelectItem value="rabbit">Conejo</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="petAge">Edad</Label>
                <Input
                  id="petAge"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="Ej: 3 años"
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* Emergency Description */}
          <div className="space-y-2">
            <Label htmlFor="description">¿Qué está pasando?</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los síntomas o la emergencia. Cuanto más detallado, mejor podremos ayudarte..."
              className="min-h-32 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Incluye síntomas, comportamiento inusual, o cualquier detalle relevante
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-emergency"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Buscando veterinarios...
                </>
              ) : (
                "Solicitar Ayuda Ahora"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyRequestModal;
