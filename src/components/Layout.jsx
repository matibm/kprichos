import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import PromoBar from './PromoBar';

const Layout = () => {
    const navigate = useNavigate();

    const handleSearch = (term) => {
        // Navigate to shop with search query if needed, for now just basic filter in Shop page can handle it via state
        // or passing URL params. Let's assume we pass it via state to /tienda
        navigate('/tienda', { state: { search: term } });
    };

    return (
        <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal font-sans antialiased">
            <Helmet>
                <title>K'prichos - Moda y Estilo</title>
                <meta name="description" content="Descubre las últimas tendencias en moda femenina en K'prichos. Ropa elegante, casual y accesorios para lucir espectacular." />
                <html lang="es" />
            </Helmet>
            <PromoBar />
            <Navbar onSearch={handleSearch} />
            <main id="main-content" className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
