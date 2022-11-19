import {createContext, useContext} from 'react';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

type SupabaseContextType = {
  nice: () => string;
  cowboy: () => string;
  bebop: () => string;
  supabaseClient: SupabaseClient<any, 'public', any>;
};

const SupabaseContext = createContext<SupabaseContextType>({
  nice() {
    return 'nice!';
  },
  cowboy() {
    return '';
  },
  bebop() {
    return '';
  },
  supabaseClient,
});

const SupabaseProvider = ({children}: {children: React.ReactNode}) => {
  const defaultValue = useContext(SupabaseContext);

  const value = {
    ...defaultValue,
    cowboy: () => {
      return 'cowboy!';
    },
    bebop: () => {
      return 'bebop!';
    },
  };
  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

const useSupabase = () => {
  return useContext(SupabaseContext);
};

export {useSupabase, SupabaseProvider, SupabaseContext};
