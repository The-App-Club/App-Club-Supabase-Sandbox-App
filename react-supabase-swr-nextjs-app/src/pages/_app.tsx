import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';
import {customTheme} from '@/config/theme';
import {CssVarsProvider} from '@mui/joy';
import {SupabaseProvider} from '@/contexts/SupabaseContext';
import {ChakraProvider} from '@chakra-ui/react';

import '@/styles/index.css';
import '@/styles/index.scss';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <RecoilRoot>
      <SupabaseProvider>
        <ChakraProvider>
          <CssVarsProvider theme={customTheme}>
            <Component {...pageProps} />
          </CssVarsProvider>
        </ChakraProvider>
      </SupabaseProvider>
    </RecoilRoot>
  );
};

export default MyApp;
