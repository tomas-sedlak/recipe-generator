import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import HomePage from './pages/HomePage';
import GenerateCookiesPage from './pages/GenerateCookiesPage';
import CookieRecipePage from './pages/CookieRecipePage';
import GenerateMuffinsPage from './pages/GenerateMuffinsPage';
import MuffinsRecipePage from './pages/MuffinsRecipePage';

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Cookies */}
            <Route path="/cookies/generate" element={<GenerateCookiesPage />} />
            <Route path="/cookies" element={<CookieRecipePage />} />

            {/* Muffins */}
            <Route path="/muffins/generate" element={<GenerateMuffinsPage />} />
            <Route path="/muffins" element={<MuffinsRecipePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
