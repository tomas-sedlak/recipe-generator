// React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import ScrollToTop from './components/common/ScrollToTop';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';

// Import pages
import HomePage from './pages/HomePage';
import GenerateCookiesPage from './pages/GenerateCookiesPage';
import GenerateMuffinsPage from './pages/GenerateMuffinsPage';
import NotFoundPage from './pages/NotFoundPage';
import Recipes from './pages/Recipes';

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Generate */}
            <Route path="/cookies" element={<GenerateCookiesPage />} />
            <Route path="/muffins" element={<GenerateMuffinsPage />} />

            {/* Recipes */}
            <Route path="/recipes/:slug" element={<Recipes />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
