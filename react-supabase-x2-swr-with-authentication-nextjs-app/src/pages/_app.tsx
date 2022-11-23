import '@/styles/index.css';
import '@/styles/index.scss';
import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';
import {customTheme} from '@/config/theme';
import {CssVarsProvider} from '@mui/joy';
import {SupabaseProvider} from '@/contexts/SupabaseContext';
import {ChakraProvider} from '@chakra-ui/react';
import Header from '@/components/Header';
import {Toaster} from 'react-hot-toast';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <RecoilRoot>
      <Toaster position="bottom-left" />
      <SupabaseProvider>
        <CssVarsProvider theme={customTheme}>
          <ChakraProvider>
            <Header />
            <Component {...pageProps} />
          </ChakraProvider>
        </CssVarsProvider>
      </SupabaseProvider>
    </RecoilRoot>
  );
};

export default MyApp;
