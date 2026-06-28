import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import BankPortal from './components/BankPortal/BankPortal';
import AirlinesPortal from './components/AirlinesPortal/AirlinesPortal';
import Architecture from './components/Architecture/Architecture';
import Status from './components/Status/Status';
import DatabaseDemo from './components/DatabaseDemo/DatabaseDemo';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout variant="dark">
              <Home />
            </Layout>
          </Route>

          <Route path="/bank">
            <Layout variant="light">
              <BankPortal />
            </Layout>
          </Route>

          <Route path="/airlines">
            <Layout variant="light">
              <AirlinesPortal />
            </Layout>
          </Route>

          <Route path="/architecture">
            <Layout variant="dark">
              <Architecture />
            </Layout>
          </Route>

          <Route path="/status">
            <Layout variant="dark">
              <Status />
            </Layout>
          </Route>

          {/* Legacy route — redirect old workshop link */}
          <Route path="/db">
            <Redirect to="/bank" />
          </Route>

          {/* Legacy DatabaseDemo kept as fallback if needed */}
          <Route path="/legacy-db">
            <Layout variant="dark">
              <DatabaseDemo />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
