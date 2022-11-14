import {useRouter} from 'next/router';
import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import {SessionContextProvider} from '@supabase/auth-helpers-react';
import type {AppProps} from 'next/app';
import {useState} from 'react';
import {Database} from '@/config/db_types';
import {customTheme} from '@/config/theme';
import {CssVarsProvider} from '@mui/joy';
import '@/styles/index.css';
import '@/styles/index.scss';
import Header from '@/components/Header';

function MyApp({Component, pageProps}: AppProps<{initialSession: Session}>) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      // initialSession={pageProps.initialSession}
    >
      <Header />
      <CssVarsProvider theme={customTheme}>
        <Component {...pageProps} />
      </CssVarsProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
