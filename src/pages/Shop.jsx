import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('Recomendados');

    useEffect(() => {
        // Handle init state from navigation if passed
        if (location.state?.category) {
            filterCatalog(location.state.category);
        } else if (location.state?.search) {
            handleSearch(location.state.search);
        } else {
            setFilteredProducts(products); // Reset if no state
        }
    }, [location.state]);

    const filterCatalog = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            setFilteredProducts(filtered);
        }
    };

    const handleSearch = (term) => {
        const results = products.filter(p =>
            p.title.toLowerCase().includes(term.toLowerCase()) ||
            p.category.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(results);
    };

    const handleSort = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        let sorted = [...filteredProducts];

        if (order === 'Precio: Menor a Mayor') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (order === 'Precio: Mayor a Menor') {
            sorted.sort((a, b) => b.price - a.price);
        } else {
            // Recomendados (default ID sort or shuffle)
            sorted.sort((a, b) => a.id - b.id);
        }
        setFilteredProducts(sorted);
    };

    return (
        <div id="catalog-view" className="container mx-auto px-4 py-8 view-transition">
            <Helmet>
                <title>Tienda | K'Prichos Catálogo</title>
                <meta name="description" content="Explora nuestro catálogo de ropa femenina. Encuentra tops, faldas, vestidos y conjuntos exclusivos." />
            </Helmet>
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                <Link to="/" className="hover:text-brand-charcoal">Inicio</Link>
                <span>/</span>
                <span className="text-brand-charcoal font-bold">Tienda</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="font-serif text-xl mb-4 pb-2 border-b border-gray-200">Filtrar por</h3>

                        <div className="mb-6">
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-brand-charcoal">Categoría</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><button onClick={() => filterCatalog('all')} className={`hover:text-brand-taupe w-full text-left py-1 ${selectedCategory === 'all' ? 'font-bold text-brand-taupe' : ''}`}>Ver Todo</button></li>
                                <li><button onClick={() => filterCatalog('Tops')} className={`hover:text-brand-taupe w-full text-left py-1 ${selectedCategory === 'Tops' ? 'font-bold text-brand-taupe' : ''}`}>Tops</button></li>
                                <li><button onClick={() => filterCatalog('Faldas')} className={`hover:text-brand-taupe w-full text-left py-1 ${selectedCategory === 'Faldas' ? 'font-bold text-brand-taupe' : ''}`}>Faldas & Shorts</button></li>
                                <li><button onClick={() => filterCatalog('Vestidos')} className={`hover:text-brand-taupe w-full text-left py-1 ${selectedCategory === 'Vestidos' ? 'font-bold text-brand-taupe' : ''}`}>Vestidos</button></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-brand-charcoal">Precio</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Min</span>
                                <input type="number" placeholder="0" className="w-20 border border-gray-300 px-2 py-1 rounded-sm focus:border-brand-taupe outline-none" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-gray-500">Mostrando {filteredProducts.length} productos</span>
                        <select className="border border-gray-200 text-sm py-2 px-4 rounded-sm focus:outline-none bg-white" onChange={handleSort} value={sortOrder}>
                            <option>Orden: Recomendados</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <Link to={`/producto/${product.id}`} key={product.id} className="product-card group cursor-pointer block">
                                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-100 rounded-sm">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="product-overlay absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button className="bg-white text-brand-charcoal px-6 py-2 text-xs uppercase font-bold tracking-widest hover:bg-brand-taupe hover:text-white transition-colors">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
                                    <h3 className="font-serif text-lg text-brand-charcoal group-hover:text-brand-taupe transition-colors">{product.title}</h3>
                                    <p className="font-bold text-gray-900 mt-1">{product.price.toLocaleString('es-PY')} Gs.</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
