import './i18n/i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageContent from './layout/PageContent';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Team from './pages/Team';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <Router>
        <PageContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<AboutUs />} />
              <Route path="/signup" element={<SignUp />} />
          </Routes>
        </PageContent>
    </Router>
  );
}