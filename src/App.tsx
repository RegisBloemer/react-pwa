import { Fragment } from 'react';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import CssBaseline from '@mui/material/CssBaseline';

import 'bootstrap/dist/css/bootstrap.min.css';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import ThemeProvider from '@/theme/Provider';

function App() {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <Fragment>
              <CssBaseline />
              <Notifications />
              <HotKeys />
              <SW />
              <BrowserRouter>
                <Header />
                <Pages />
              </BrowserRouter>
            </Fragment>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
