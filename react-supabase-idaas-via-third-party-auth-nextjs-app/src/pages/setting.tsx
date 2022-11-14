import {Database} from '@/config/db_types';
import {useSupabaseClient} from '@supabase/auth-helpers-react';
import {NextPage} from 'next';

const SettingPage: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <div>
      <h2>Setting Page</h2>
      <button
        onClick={() => {
          supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
              scopes: 'repo',
              redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
            },
          });
        }}
      >
        Connect Github
      </button>
    </div>
  );
};

export default SettingPage;
