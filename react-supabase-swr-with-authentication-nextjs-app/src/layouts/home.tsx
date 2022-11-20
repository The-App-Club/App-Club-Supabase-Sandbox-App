const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="text-3xl font-bold">Supabase Todo</h1>
      {children}
    </div>
  );
};

export default Layout;
