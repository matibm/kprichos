import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    useEffect(() => {
        // Load Google Maps API Script dynamically
        const loadScript = () => {
            if (document.querySelector('script[src*="maps.googleapis.com"]')) {
                initMap(); // If already loaded, just init
                return;
            }

            const script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBB_SVKlC9CcEjDt1H01_B7Gjmb8FiIaGw&callback=initMap&libraries=marker";
            script.async = true;
            script.defer = true;
            window.initMap = initMap;
            document.head.appendChild(script);
        };

        const initMap = () => {
            if (!window.google) return;

            const position = { lat: -25.325, lng: -57.55 }; // Approximate Fernando de la Mora
            const mapElement = document.getElementById("map");

            if (mapElement) {
                const map = new window.google.maps.Map(mapElement, {
                    zoom: 14,
                    center: position,
                    mapId: 'STORE_MAP',
                    disableDefaultUI: true,
                    styles: [
                        { "featureType": "all", "stylers": [{ "saturation": -80 }] },
                        { "featureType": "water", "stylers": [{ "color": "#cad2d3" }] }
                    ]
                });

                // AdvancedMarkerElement might need simpler fallback if not using valid mapID or latest version features seamlessly in this context,
                // but trying standard Marker for wider compatibility if Advanced fails, though original used Advanced.
                // Let's stick to standard Marker for simplicity in React without extra libs or reuse logic if possible.
                // Actually the original code used AdvancedMarkerElement which requires a Map ID.

                try {
                    // Simple marker fallback for safety
                    new window.google.maps.Marker({
                        position: position,
                        map: map,
                        title: "K'Prichos"
                    });
                } catch (e) {
                    console.error("Marker init failed", e);
                }
            }
        };

        loadScript();

        return () => {
            // Cleanup if needed
            delete window.initMap;
        };
    }, []);

    return (
        <section id="contacto" className="bg-white py-16">
            <Helmet>
                <title>Contacto y Ubicación | K'Prichos</title>
                <meta name="description" content="Visítanos en nuestra tienda en Fernando de la Mora. Horarios de atención y contacto por WhatsApp." />
            </Helmet>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-brand-taupe uppercase tracking-widest text-xs font-bold mb-2 block">Ubicación</span>
                        <h2 className="font-serif text-3xl text-brand-charcoal mb-6">Nuestra Tienda Física</h2>
                        <div className="space-y-4 text-gray-600">
                            <p className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-brand-taupe">storefront</span>
                                <span>
                                    <strong>Fernando de la Mora, Paraguay</strong><br />
                                    Visítanos para probarte tus prendas favoritas.
                                </span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-brand-taupe">schedule</span>
                                <span>
                                    <strong>Horario de Atención:</strong><br />
                                    Lun - Vie: 09:30 - 18:30<br />
                                    Sáb: 10:00 - 19:00
                                </span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-brand-taupe">call</span>
                                <span>
                                    <strong>WhatsApp:</strong> +595 974 605702<br />
                                    <span className="text-xs italic">Atención personalizada para tus pedidos online.</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="h-[350px] bg-gray-100 rounded-sm shadow-lg overflow-hidden relative">
                        <div id="map" className="w-full h-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
