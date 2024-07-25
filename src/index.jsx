import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Cv from './pages/Cv';

import './translations/i18n';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/projects/:id" component={Projects} />
              <Route exact path="/cv" component={Cv} />
              <Route component={NotFound} />
            </Switch>
          </PrizeProvider>
        </PaintsProvider>
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);
