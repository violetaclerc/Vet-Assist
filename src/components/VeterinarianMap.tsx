import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';

interface Veterinarian {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: number;
  coordinates: [number, number]; // [lng, lat]
  zone: string;
}

const mockVeterinarians: Veterinarian[] = [
  {
    id: "1",
    name: "Dra. María González",
    specialty: "Emergencias y Cuidados Críticos",
    rating: 4.9,
    distance: 0.8,
    coordinates: [-58.3816, -34.6037], // Palermo
    zone: "Palermo",
  },
  {
    id: "2",
    name: "Dr. Carlos Rodríguez",
    specialty: "Medicina Interna y Cirugía",
    rating: 4.8,
    distance: 1.2,
    coordinates: [-58.4173, -34.6083], // Belgrano
    zone: "Belgrano",
  },
  {
    id: "3",
    name: "Dra. Ana Martínez",
    specialty: "Emergencias y Cuidados Paliativos",
    rating: 5.0,
    distance: 1.5,
    coordinates: [-58.3916, -34.5875], // Recoleta
    zone: "Recoleta",
  },
  {
    id: "4",
    name: "Dr. Juan Pérez",
    specialty: "Pediatría Veterinaria",
    rating: 4.7,
    distance: 2.3,
    coordinates: [-58.4456, -34.6214], // Caballito
    zone: "Caballito",
  },
  {
    id: "5",
    name: "Dra. Laura Fernández",
    specialty: "Cirugía y Traumatología",
    rating: 4.9,
    distance: 3.1,
    coordinates: [-58.3684, -34.6175], // Villa Crespo
    zone: "Villa Crespo",
  },
  {
    id: "6",
    name: "Dr. Roberto Sánchez",
    specialty: "Medicina General",
    rating: 4.6,
    distance: 2.8,
    coordinates: [-58.4368, -34.5731], // Núñez
    zone: "Núñez",
  },
];

const VeterinarianMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-58.4083, -34.6037], // Buenos Aires centro
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add markers for each veterinarian
      mockVeterinarians.forEach((vet) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiMwZDkyOWIiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEyIiBmaWxsPSIjMGQ5MjliIi8+CjxwYXRoIGQ9Ik0yMCAxNVYyNU0xNSAyMEgyNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+)';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-base mb-1">${vet.name}</h3>
            <p class="text-sm text-muted-foreground mb-2">${vet.specialty}</p>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm font-medium">${vet.rating}</span>
              </div>
              <div class="flex items-center gap-1 text-muted-foreground">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span class="text-sm">${vet.distance} km</span>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">${vet.zone}</p>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(vet.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      setIsMapReady(true);
      setTokenError(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setTokenError(true);
      setIsMapReady(false);
    }
  };

  const handleLoadMap = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapReady) {
    return (
      <div className="card-elevated p-8 space-y-6">
        <div className="text-center space-y-3">
          <MapPin className="w-12 h-12 mx-auto text-primary" />
          <h3 className="text-xl font-semibold">Mapa de Veterinarios Cercanos</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Para ver el mapa interactivo con veterinarios en diferentes zonas, necesitas un token de Mapbox.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Token de Mapbox</label>
            <Input
              type="text"
              placeholder="pk.ey..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className={tokenError ? 'border-destructive' : ''}
            />
            {tokenError && (
              <p className="text-xs text-destructive">
                Token inválido. Verifica tu token de Mapbox.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Obtén tu token gratuito en{' '}
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                mapbox.com
              </a>
            </p>
          </div>

          <Button
            onClick={handleLoadMap}
            disabled={!mapboxToken.trim()}
            className="w-full btn-primary-gradient"
          >
            Cargar Mapa
          </Button>
        </div>

        {/* Preview of veterinarians */}
        <div className="border-t pt-6 space-y-3">
          <p className="text-sm font-medium text-center text-muted-foreground">
            Veterinarios que verás en el mapa:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mockVeterinarians.map((vet) => (
              <div key={vet.id} className="p-3 rounded-lg bg-muted/50 space-y-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <span className="text-xs font-medium">{vet.rating}</span>
                </div>
                <p className="text-xs font-medium line-clamp-1">{vet.name}</p>
                <p className="text-xs text-muted-foreground">{vet.zone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {mockVeterinarians.length} veterinarios disponibles en el mapa
          </span>
        </div>
      </div>
      
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-xl shadow-lg border"
        style={{ minHeight: '500px' }}
      />

      <p className="text-xs text-center text-muted-foreground">
        Haz clic en los marcadores para ver información de cada veterinario
      </p>
    </div>
  );
};

export default VeterinarianMap;
