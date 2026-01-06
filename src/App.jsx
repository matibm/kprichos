import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tienda" element={<Shop />} />
          <Route path="producto/:id" element={<ProductDetail />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
