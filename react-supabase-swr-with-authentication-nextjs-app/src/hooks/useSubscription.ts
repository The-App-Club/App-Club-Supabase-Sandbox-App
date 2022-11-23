import {useEffect} from 'react';
import {
  SupabaseEventTypes,
  SupabaseRealtimePayload,
} from '@supabase/supabase-js/dist/main/lib/types';

import {useSupabase} from '@/contexts/SupabaseContext';

// https://github.com/tmm/react-supabase/blob/main/src/hooks/realtime/use-subscription.ts#L21-L29
export type UseSubscriptionConfig = {
  event?: SupabaseEventTypes;
  table?: string;
};

export function useSubscription<Data = any>(
  callback: (payload: SupabaseRealtimePayload<Data>) => void,
  config: UseSubscriptionConfig = {event: '*', table: '*'}
) {
  const {supabaseClient} = useSupabase();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const subscription = supabaseClient
      .from<Data>(config.table ?? '*')
      .on(config.event ?? '*', callback)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
}
