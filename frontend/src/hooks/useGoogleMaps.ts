import { useState, useEffect } from 'react';

const SCRIPT_ID = 'google-maps-script';

declare global {
  interface Window {
    googleMapsLoaded?: () => void;
  }
}


export function useGoogleMaps(): boolean {
  const [isLoaded, setIsLoaded] = useState<boolean>(
    typeof window !== 'undefined' && Boolean(window.google?.maps)
  );

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    if (document.getElementById(SCRIPT_ID)) {
      // Script already injected but not yet loaded — wait for callback
      window.googleMapsLoaded = () => setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';

    window.googleMapsLoaded = () => setIsLoaded(true);

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=googleMapsLoaded&language=pt-BR&region=BR`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return isLoaded;
}
