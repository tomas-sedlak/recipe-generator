import { HashRouter as Router, Route, Routes } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import GenerateCookiesPage from './pages/GenerateCookiesPage';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation bar and footer would be common across pages */}
        {/* <NavBar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GenerateCookiesPage />} />
        </Routes>

        {/* Footer (common across all pages) */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
