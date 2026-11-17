import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Cv from './pages/Cv';

import './translations/i18n';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import { PaintsProvider } from './context/PaintsContext';
import { PrizeProvider } from './context/PrizeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ProjectsProvider>
        <PaintsProvider>
          <PrizeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cv" element={<Cv />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PrizeProvider>
        </PaintsProvider>
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);
