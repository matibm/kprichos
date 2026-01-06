import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data';

const Home = () => {
    const navigate = useNavigate();

    const handleFilter = (category) => {
        navigate('/tienda', { state: { category } });
    };

    return (
        <div id="home-view" className="view-transition">
            <Helmet>
                <title>K'Prichos | Moda y Tendencia en Paraguay</title>
                <meta name="description" content="Descubre lo último en moda femenina en K'Prichos. Tops, faldas, vestidos y más. Envíos a todo Paraguay." />
            </Helmet>
            {/* Hero Banner */}
            <section className="relative h-[500px] md:h-[600px] bg-gray-100 overflow-hidden">
                <img
                    src="/images/hero-banner.webp"
                    alt="Nueva Colección"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="text-center bg-white/90 backdrop-blur-sm p-8 md:p-12 max-w-lg mx-4 shadow-xl">
                        <span className="block text-brand-taupe text-xs uppercase tracking-[0.2em] mb-3 font-bold">
                            Nueva Temporada 2025
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6 leading-tight">
                            Tendencias que Enamoran
                        </h1>
                        <Link to="/tienda"
                            className="bg-brand-charcoal text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-brand-taupe transition-colors inline-block">
                            Ver Catálogo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="font-serif text-3xl text-brand-charcoal">Categorías Populares</h2>
                    <Link to="/tienda"
                        className="text-brand-taupe text-sm font-bold uppercase tracking-wider hover:underline">
                        Ver Todo
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.name} className="relative h-96 group cursor-pointer overflow-hidden" onClick={() => handleFilter(cat.name)}>
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <h3 className="text-white font-serif text-2xl">{cat.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
