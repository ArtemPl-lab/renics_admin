import './bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import * as Pages from './pages';
import Navigation from './components/Navigation';
import Toasts from './components/Toasts';
import { useStore } from './store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import SiteContent from './components/SiteContent';
function App() {
  const { user } = useStore();
  useEffect(user.checkAccess, []);
  if(!user.data) return <Pages.Auth />
  return (
      <BrowserRouter>
        <SiteContent>
          <Navigation />
          <div className="container">
            <Routes />
          </div>
        </SiteContent>
        <Toasts />
      </BrowserRouter>
  );
}

export default observer(App);
