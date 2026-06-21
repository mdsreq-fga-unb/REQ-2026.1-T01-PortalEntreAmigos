import { useEffect, useRef } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { ExternalLink } from 'lucide-react';
import { useGoogleMaps } from '../../../../hooks/useGoogleMaps';
import styles from './CollectionPoint.module.css';

export interface PontoColeta {
  lat: number;
  lng: number;
  nome: string;
}

interface CollectionPointProps {
  pontosColeta?: PontoColeta[];
  localTexto?: string;
}

export function CollectionPoint({ pontosColeta = [], localTexto }: CollectionPointProps) {
  const isLoaded = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const hasPontos = pontosColeta.length > 0;

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !hasPontos) return;
    if (mapInstanceRef.current) return; // already initialized

    const center = { lat: pontosColeta[0].lat, lng: pontosColeta[0].lng };

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'cooperative',
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      ],
    });

    mapInstanceRef.current = map;

    // Add markers + InfoWindows
    pontosColeta.forEach((ponto, idx) => {
      const marker = new window.google.maps.Marker({
        position: { lat: ponto.lat, lng: ponto.lng },
        map,
        title: ponto.nome,
        label: {
          text: String(idx + 1),
          color: 'white',
          fontWeight: 'bold',
          fontSize: '13px',
        },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 18,
          fillColor: '#6c47ff',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
        animation: window.google.maps.Animation.DROP,
      });

      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${ponto.lat},${ponto.lng}`;
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family:Inter,sans-serif;padding:4px 2px;min-width:160px">
            <strong style="font-size:14px;color:#111">${ponto.nome}</strong><br/>
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer"
               style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;color:#6c47ff;font-size:13px;text-decoration:none;font-weight:600">
              🗺️ Abrir rota no Google Maps
            </a>
          </div>`,
      });

      marker.addListener('click', () => infoWindow.open(map, marker));
    });

    // Adjust bounds if multiple points
    if (pontosColeta.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      pontosColeta.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
      map.fitBounds(bounds, 60);
    }
  }, [isLoaded, hasPontos]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <FiMapPin size={24} color="white" />
        </div>
        <div>
          <h2 className={styles.title}>Pontos de Coleta</h2>
          {localTexto && <p className={styles.hours}>{localTexto}</p>}
        </div>
      </div>

      {hasPontos ? (
        <>
          {/* Google Maps */}
          <div className={styles.mapContainer}>
            {!isLoaded && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner} />
                <span>Carregando mapa…</span>
              </div>
            )}
            <div ref={mapRef} className={styles.mapReal} />
          </div>

          {/* List of points */}
          <ul className={styles.pontosList}>
            {pontosColeta.map((ponto, idx) => (
              <li key={idx} className={styles.pontoItem}>
                <span className={styles.pontoPin}>{idx + 1}</span>
                <span className={styles.pontoNome}>{ponto.nome}</span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${ponto.lat},${ponto.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pontoLink}
                >
                  Rota <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={styles.noPoints}>
          <p>Nenhum ponto de coleta geolocalizado foi cadastrado para esta campanha.</p>
          {localTexto && (
            <p className={styles.localFallback}>
              <FiMapPin size={14} /> {localTexto}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
