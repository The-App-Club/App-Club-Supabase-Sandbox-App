import {Database} from '@/config/db_types';
import {
  useSessionContext,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import Image from 'next/image';
import {useRouter} from 'next/router';

const Header = () => {
  const router = useRouter();
  const {isLoading, session, error} = useSessionContext();
  const supabaseClient = useSupabaseClient<Database>();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const renderNavContent = (session: Session | null) => {
    if (session) {
      return (
        <div className="flex items-center gap-2">
          <span>{`Welcome ${session.user.email}!`}</span>
          <button
            className={`px-6 py-2 h-[3rem] bg-blue-500 hover:bg-blue-800 text-white text-lg rounded-md hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
            onClick={async () => {
              await supabaseClient.auth.signOut();
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <button
        className={`px-6 py-2 h-[3rem] bg-blue-500 hover:bg-blue-800 text-white text-lg rounded-md hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
        onClick={(e) => {
          router.push('/');
        }}
      >
        Login
      </button>
    );
  };

  return (
    <header
      className={`w-full min-h-[60px] bg-gradient-to-r from-sky-700 to-amber-200 px-2`}
    >
      <nav className="flex justify-between items-center">
        {/* <picture
          className={`hover:cursor-pointer`}
          onClick={(e) => {
            router.push('/');
          }}
        >
          <source srcSet={`/assets/logo.webp`} type={`image/webp`} />
          <img src={'/assets/logo.webp'} alt={'logo'} width={60} height={60} />
        </picture> */}
        <Image
          alt="logo"
          src={'/assets/logo.webp'}
          width={60}
          height={60}
          className={`hover:cursor-pointer`}
          onClick={(e) => {
            router.push('/');
          }}
        />
        {renderNavContent(session)}
      </nav>
    </header>
  );
};

export default Header;
