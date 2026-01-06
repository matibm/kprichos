import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-brand-charcoal text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-serif text-2xl font-bold mb-4">K'PRICHOS</h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                        Tu destino de moda en Fernando de la Mora. Últimas tendencias, estilo único y atención
                        personalizada.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-brand-taupe">Navegación</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-white">Inicio</Link></li>
                        <li><Link to="/tienda" className="hover:text-white">Tienda</Link></li>
                        <li><Link to="/contacto" className="hover:text-white">Ubicación</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-brand-taupe">Ayuda</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="https://wa.me/595974605702" className="hover:text-white">Atención al Cliente</a></li>
                        <li><a href="#" className="hover:text-white">Política de Envíos</a></li>
                        <li><a href="#" className="hover:text-white">Cambios y Devoluciones</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-500">
                © 2025 K'Prichos Boutique. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
