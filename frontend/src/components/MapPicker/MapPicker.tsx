import { useEffect, useRef, useState } from 'react';
import { MapPin, X, Plus } from 'lucide-react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import styles from './MapPicker.module.css';

export interface PontoColeta {
  lat: number;
  lng: number;
  nome: string;
}

interface MapPickerProps {
  pontos: PontoColeta[];
  onChange: (pontos: PontoColeta[]) => void;
}

// Centro padrão: Brasília-DF
const DEFAULT_CENTER = { lat: -15.7942, lng: -47.8825 };
const DEFAULT_ZOOM = 12;

export function MapPicker({ pontos, onChange }: MapPickerProps) {
  const isLoaded = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [pendingClick, setPendingClick] = useState<{ lat: number; lng: number } | null>(null);
  const [nomePonto, setNomePonto] = useState('');

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const center = pontos.length > 0
      ? { lat: pontos[0].lat, lng: pontos[0].lng }
      : DEFAULT_CENTER;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        { featureType: 'all', elementType: 'geometry', stylers: [{ saturation: -20 }] },
      ],
    });

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      setPendingClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      setNomePonto('');
    });

    mapInstanceRef.current = map;
  }, [isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync markers whenever pontos change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Add new markers
    pontos.forEach((ponto, idx) => {
      const marker = new window.google.maps.Marker({
        position: { lat: ponto.lat, lng: ponto.lng },
        map: mapInstanceRef.current!,
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
      });
      markersRef.current.push(marker);
    });
  }, [pontos]);

  const handleConfirmarPonto = () => {
    if (!pendingClick || !nomePonto.trim()) return;
    const novo: PontoColeta = { ...pendingClick, nome: nomePonto.trim() };
    onChange([...pontos, novo]);
    setPendingClick(null);
    setNomePonto('');
  };

  const handleRemoverPonto = (idx: number) => {
    const atualizados = pontos.filter((_, i) => i !== idx);
    onChange(atualizados);
  };

  const handleCancelarPendente = () => {
    setPendingClick(null);
    setNomePonto('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapWrapper}>
        {!isLoaded && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
            <span>Carregando mapa…</span>
          </div>
        )}
        <div ref={mapRef} className={styles.map} />
        {isLoaded && !pendingClick && pontos.length === 0 && (
          <div className={styles.hint}>
            <MapPin size={20} />
            Clique no mapa para adicionar pontos de coleta
          </div>
        )}
      </div>

      {/* Dialog para nomear o ponto pendente */}
      {pendingClick && (
        <div className={styles.pendingDialog}>
          <p className={styles.pendingInfo}>
            <MapPin size={16} /> Novo ponto em ({pendingClick.lat.toFixed(5)}, {pendingClick.lng.toFixed(5)})
          </p>
          <div className={styles.pendingInputRow}>
            <input
              autoFocus
              className={styles.pendingInput}
              placeholder="Nome do ponto (ex: Sede Centro)"
              value={nomePonto}
              onChange={e => setNomePonto(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleConfirmarPonto(); if (e.key === 'Escape') handleCancelarPendente(); }}
            />
            <button type="button" className={styles.btnConfirmPin} onClick={handleConfirmarPonto} disabled={!nomePonto.trim()}>
              <Plus size={18} /> Adicionar
            </button>
            <button type="button" className={styles.btnCancelPin} onClick={handleCancelarPendente}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Lista de pontos adicionados */}
      {pontos.length > 0 && (
        <div className={styles.pontosLista}>
          <h4 className={styles.pontosListaTitle}>Pontos de Coleta Adicionados</h4>
          <ul className={styles.pontosList}>
            {pontos.map((ponto, idx) => (
              <li key={idx} className={styles.pontoItem}>
                <span className={styles.pontoNumero}>{idx + 1}</span>
                <span className={styles.pontoNome}>{ponto.nome}</span>
                <span className={styles.pontoCoordenadas}>
                  {ponto.lat.toFixed(4)}, {ponto.lng.toFixed(4)}
                </span>
                <button
                  type="button"
                  className={styles.btnRemover}
                  onClick={() => handleRemoverPonto(idx)}
                  title="Remover ponto"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
