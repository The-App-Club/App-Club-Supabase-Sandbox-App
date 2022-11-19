import type {AppProps} from 'next/app';
import {customTheme} from '@/config/theme';
import {CssVarsProvider} from '@mui/joy';
import {SupabaseProvider} from '@/contexts/SupabaseContext';

import '@/styles/index.css';
import '@/styles/index.scss';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <SupabaseProvider>
      <CssVarsProvider theme={customTheme}>
        <Component {...pageProps} />
      </CssVarsProvider>
    </SupabaseProvider>
  );
};

export default MyApp;
