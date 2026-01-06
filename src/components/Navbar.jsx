import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ onSearch }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => document.getElementById('search-input')?.focus(), 100);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            onSearch(e.target.value);
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-brand-charcoal" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-brand-charcoal">
                        K'PRICHOS
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm uppercase tracking-wide hover:text-brand-taupe transition-colors">Inicio</Link>
                        <Link to="/tienda" className="text-sm uppercase tracking-wide hover:text-brand-taupe transition-colors font-bold">Tienda</Link>
                        <Link to="/contacto" className="text-sm uppercase tracking-wide hover:text-brand-taupe transition-colors">Ubicación</Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:text-brand-taupe transition-colors relative" onClick={toggleSearch}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <a href="https://wa.me/595974605702" target="_blank" rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest hover:bg-brand-taupe transition-colors">
                            <span>Contacto</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Hidden) */}
            {isMobileMenuOpen && (
                <div id="mobile-menu"
                    className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link to="/" onClick={toggleMobileMenu} className="text-brand-charcoal font-medium">Inicio</Link>
                        <Link to="/tienda" onClick={toggleMobileMenu} className="text-brand-charcoal font-medium">Ver Catálogo Completo</Link>
                        <Link to="/contacto" onClick={toggleMobileMenu} className="text-brand-charcoal font-medium">Ubicación</Link>
                    </div>
                </div>
            )}

            {/* Search Bar (Hidden) */}
            <div id="search-bar"
                className={`${isSearchOpen ? '' : 'hidden'} absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 shadow-md transition-all`}>
                <div className="container mx-auto max-w-2xl relative">
                    <input type="text" id="search-input" placeholder="Buscar productos (ej: top, falda, encaje)..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 px-4 focus:outline-none focus:border-brand-taupe"
                        onKeyUp={handleSearch} />
                    <button className="absolute right-3 top-3 text-gray-400 hover:text-brand-charcoal" onClick={toggleSearch}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
