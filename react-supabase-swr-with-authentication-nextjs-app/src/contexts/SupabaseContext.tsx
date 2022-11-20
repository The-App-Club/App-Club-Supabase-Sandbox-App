import {createContext, useContext, useEffect, useState} from 'react';
import {createClient, SupabaseClient, Session} from '@supabase/supabase-js';

enum UserEventType {
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_OUT = 'SIGNED_OUT',
  TOKEN_REFRESHED = 'TOKEN_REFRESHED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  PASSWORD_RECOVERY = 'PASSWORD_RECOVERY',
}

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

type SupabaseContextType = {
  nice: () => string;
  cowboy: () => string;
  bebop: () => string;
  supabaseClient: SupabaseClient;
  event: string | null | undefined;
  session: Session | null | undefined;
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
  event: null,
  session: null,
});

const SupabaseProvider = ({children}: {children: React.ReactNode}) => {
  const defaultValue = useContext(SupabaseContext);
  const [session, setSession] = useState<Session | null>();
  const [event, setEvent] = useState<string>();

  useEffect(() => {
    const supabaseSession = supabaseClient.auth.session();
    if (supabaseSession) {
      setSession(supabaseSession);
    }
  }, []);

  useEffect(() => {
    // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
    const {data: subscription} = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case UserEventType.SIGNED_IN:
            console.log('SIGNED_IN', session);
            break;
          case UserEventType.SIGNED_OUT:
            console.log('SIGNED_OUT', session);
            break;
          case UserEventType.TOKEN_REFRESHED:
            console.log('TOKEN_REFRESHED', session);
            break;
          case UserEventType.USER_UPDATED:
            console.log('USER_UPDATED', session);
            break;
          case UserEventType.USER_DELETED:
            console.log('USER_DELETED', session);
            break;
          case UserEventType.PASSWORD_RECOVERY:
            console.log('PASSWORD_RECOVERY', session);
            break;
          default:
            break;
        }
        setEvent(event);
        setSession(session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    ...defaultValue,
    cowboy: () => {
      return 'cowboy!';
    },
    bebop: () => {
      return 'bebop!';
    },
    event,
    session,
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
