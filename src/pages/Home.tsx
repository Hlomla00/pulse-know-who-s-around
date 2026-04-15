import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Navigation, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind, Droplets, Thermometer } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';

// CPUT Cape Town campus approximate coordinates
const CPUT_CENTER: [number, number] = [-33.9285, 18.6390];

interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
}

const getWeatherIcon = (code: number) => {
  if (code === 0 || code === 1) return Sun;
  if (code >= 2 && code <= 3) return Cloud;
  if (code >= 45 && code <= 48) return Cloud;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if (code >= 61 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 95 && code <= 99) return CloudLightning;
  return Cloud;
};

const getWeatherLabel = (code: number) => {
  if (code === 0) return 'Clear';
  if (code === 1) return 'Mostly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

const friends = [
  { name: 'Lethabo M.', initials: 'LM', color: '#06C167', status: 'active', distance: '320m away', lat: -33.9275, lng: 18.6380 },
  { name: 'Zara K.', initials: 'ZK', color: '#F5A623', status: 'recent', distance: '1.2km away', lat: -33.9300, lng: 18.6410 },
  { name: 'Sipho N.', initials: 'SN', color: '#545454', status: 'inactive', distance: 'Location off', lat: -33.9260, lng: 18.6420 },
];

const createFriendMarker = (friend: typeof friends[0]) => {
  const borderColor = friend.status === 'active' ? '#06C167' : friend.status === 'recent' ? '#F5A623' : '#545454';
  const glowClass = friend.status === 'active' ? 'pulse-marker-glow' : '';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="friend-pin ${glowClass}" style="
        width: 44px; height: 44px; border-radius: 50%;
        background: #1C1C1C; border: 3px solid ${borderColor};
        display: flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700; color: white; font-family: Inter, sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        position: relative;
      ">
        ${friend.initials}
        ${friend.status === 'active' ? `<div style="
          position: absolute; bottom: -2px; right: -2px;
          width: 12px; height: 12px; border-radius: 50%;
          background: #06C167; border: 2px solid #000;
        "></div>` : ''}
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
};

const Home = () => {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const statusDot = (status: string) => {
    if (status === 'active') return 'bg-primary animate-glow-pulse';
    if (status === 'recent') return 'bg-pulse-amber';
    return 'bg-pulse-grey';
  };

  const statusText = (status: string) => {
    if (status === 'active') return 'Active Now';
    if (status === 'recent') return 'Active 5m ago';
    return 'Inactive';
  };

  const statusTextColor = (status: string) => {
    if (status === 'active') return 'text-primary';
    if (status === 'recent') return 'text-pulse-amber';
    return 'text-muted-foreground';
  };

  const pinBorder = (status: string) => {
    if (status === 'active') return 'ring-2 ring-primary';
    return 'ring-2 ring-muted-foreground/40';
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: CPUT_CENTER,
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark theme tiles (CartoDB Dark Matter - free, no key needed)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add attribution in bottom-right
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© <a href="https://carto.com/">CARTO</a> © <a href="https://osm.org/">OSM</a>')
      .addTo(map);

    // Add friend markers
    friends.forEach(f => {
      L.marker([f.lat, f.lng], { icon: createFriendMarker(f) })
        .bindPopup(`<div style="background:#1C1C1C;color:white;padding:8px 12px;border-radius:8px;font-family:Inter,sans-serif;font-size:13px;">
          <strong>${f.name}</strong><br/>
          <span style="color:${f.status === 'active' ? '#06C167' : f.status === 'recent' ? '#F5A623' : '#545454'}">${f.status === 'active' ? '● Active Now' : f.status === 'recent' ? '● Active 5m ago' : '● Inactive'}</span><br/>
          <span style="color:#545454">${f.distance}</span>
        </div>`, {
          className: 'dark-popup',
          closeButton: false,
        })
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle geolocation
  const locateUser = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setLocating(false);
        if (mapRef.current) {
          // Remove old user marker
          mapRef.current.eachLayer((layer) => {
            if ((layer as any)._isUserMarker) mapRef.current?.removeLayer(layer);
          });
          // Add user marker
          const userIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
              width: 18px; height: 18px; border-radius: 50%;
              background: #06C167; border: 3px solid white;
              box-shadow: 0 0 12px rgba(6,193,103,0.6), 0 0 24px rgba(6,193,103,0.3);
            "></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          const marker = L.marker(coords, { icon: userIcon }).addTo(mapRef.current);
          (marker as any)._isUserMarker = true;
          mapRef.current.setView(coords, 16, { animate: true });
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: true }
    );
  };

  return (
    <MobileLayout>
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
        .dark-popup .leaflet-popup-content {
          margin: 0;
        }
        .dark-popup .leaflet-popup-tip {
          background: #1C1C1C;
        }
        .pulse-marker-glow {
          animation: markerGlow 2s ease-in-out infinite;
        }
        @keyframes markerGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(6,193,103,0.4); }
          50% { box-shadow: 0 0 20px rgba(6,193,103,0.7), 0 0 40px rgba(6,193,103,0.3); }
        }
        .leaflet-container {
          background: #0d0d0d !important;
          font-family: Inter, sans-serif;
        }
      `}</style>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-lg font-bold text-foreground">Pulse</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={locateUser}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center tap-scale"
            >
              <Navigation size={16} className={`text-primary ${locating ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center tap-scale">
              <span className="text-sm font-semibold text-foreground">JD</span>
            </button>
          </div>
        </div>

        {/* Real Map */}
        <div ref={mapContainerRef} className="flex-1 w-full" />

        {/* Bottom sheet */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[24px] card-shadow z-[1000]"
          initial={{ y: 100 }}
          animate={{ y: sheetOpen ? 0 : 140 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button
            onClick={() => setSheetOpen(!sheetOpen)}
            className="w-full flex flex-col items-center pt-3 pb-2 tap-scale"
          >
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mb-2" />
            {sheetOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronUp size={16} className="text-muted-foreground" />}
          </button>

          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base font-bold text-foreground">Friends</span>
              <span className="bg-primary/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-pill">3</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {friends.map((f, i) => (
                <div key={i} className="min-w-[120px] bg-background rounded-lg p-3 flex flex-col items-center gap-2">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${pinBorder(f.status)}`} style={{ backgroundColor: `${f.color}33` }}>
                    <span className="text-sm font-bold text-foreground">{f.initials}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{f.name}</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${statusDot(f.status)}`} />
                    <span className={`text-[10px] font-medium ${statusTextColor(f.status)}`}>{statusText(f.status)}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{f.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Home;
