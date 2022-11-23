import {createContext, useContext, useEffect, useState} from 'react';
import {
  createClient,
  SupabaseClient,
  Session,
  User,
} from '@supabase/supabase-js';
import toast from 'react-hot-toast';

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
  user: User | null | undefined;
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
  user: null,
});

const SupabaseProvider = ({children}: {children: React.ReactNode}) => {
  const defaultValue = useContext(SupabaseContext);
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>();
  const [event, setEvent] = useState<string>();

  useEffect(() => {
    (async () => {
      const {
        data: {session: supabaseSession},
      } = await supabaseClient.auth.getSession();
      const {
        data: {user},
      } = await supabaseClient.auth.getUser();
      if (supabaseSession) {
        setSession(supabaseSession);
      }
      if (user) {
        setUser(user);
      }
    })();
  }, []);

  useEffect(() => {
    // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
    const {
      data: {subscription},
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case UserEventType.SIGNED_IN:
          console.log('SIGNED_IN', session);
          // toast.success('Successfully Login!');
          break;
        case UserEventType.SIGNED_OUT:
          console.log('SIGNED_OUT', session);
          // toast.success('Successfully Logout!');
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
    });

    return () => {
      subscription.unsubscribe();
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
    user,
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
