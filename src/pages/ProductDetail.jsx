import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
            setSelectedImage(found.image);

            // Random related
            const related = products
                .filter(p => p.id !== found.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            setRelatedProducts(related);
        } else {
            navigate('/tienda');
        }
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (!product) return null;

    const message = `Hola K'Prichos! Me interesa el producto "${product.title}" que vi en la web. ¿Tienen stock?`;
    const waLink = `https://wa.me/595974605702?text=${encodeURIComponent(message)}`;

    return (
        <div id="product-detail-view" className="container mx-auto px-4 py-8 view-transition">
            <Helmet>
                <title>{product.title} | K'Prichos</title>
                <meta name="description" content={`Compra ${product.title} en K'Prichos. ${product.desc.substring(0, 150)}...`} />
            </Helmet>
            <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-charcoal mb-8">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Volver
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-4 md:p-8 rounded-sm shadow-sm">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm relative">
                        <img src={selectedImage} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {/* Simulating gallery with same image for demo */}
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i}
                                className={`aspect-square bg-gray-100 rounded-sm overflow-hidden cursor-pointer border ${selectedImage === product.image && i === 0 ? 'border-brand-taupe' : 'border-transparent'}`}
                                onClick={() => setSelectedImage(product.image)}>
                                <img src={product.image} className="w-full h-full object-cover hover:opacity-75 transition-opacity" alt="thumbnail" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col h-full">
                    <span className="text-xs uppercase tracking-widest text-brand-taupe font-bold mb-2">{product.category}</span>
                    <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">{product.title}</h1>
                    <div className="text-2xl font-light text-brand-charcoal mb-6">{product.price.toLocaleString('es-PY')} Gs.</div>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <p>{product.desc}</p>
                        <ul className="list-disc pl-5 mt-4 space-y-1">
                            <li>Material: Algodón / Encaje</li>
                            <li>Talle: Único (Cede hasta M)</li>
                            <li>Disponible para entrega inmediata</li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-100 pt-8 mt-auto">
                        <div className="flex flex-col gap-4">
                            <a href={waLink} target="_blank" rel="noopener noreferrer"
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-sm flex items-center justify-center gap-3 transition-colors shadow-sm group">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.324-.902l-.238-.141-2.479.65.66-2.415-.156-.251a6.56 6.56 0 0 1-1.002-3.505c.002-3.623 2.957-6.584 6.591-6.584 1.756 0 3.406.684 4.646 1.926 1.24 1.242 1.923 2.895 1.925 4.653 0 3.625-2.957 6.582-6.589 6.582z"></path>
                                </svg>
                                <span className="font-bold uppercase tracking-wider">Comprar por WhatsApp</span>
                            </a>
                            <p className="text-xs text-center text-gray-400">
                                Al hacer clic, se abrirá un chat con los detalles del pedido.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h3 className="font-serif text-2xl mb-6">También te podría gustar</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map(p => (
                        <Link to={`/producto/${p.id}`} key={p.id} className="cursor-pointer group block">
                            <div className="aspect-[3/4] bg-gray-100 mb-2 overflow-hidden rounded-sm">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h4 className="font-serif text-sm text-brand-charcoal">{p.title}</h4>
                            <span className="text-xs font-bold text-gray-500">{p.price.toLocaleString('es-PY')} Gs.</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
