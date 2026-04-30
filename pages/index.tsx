import type { NextPage } from 'next';
import React from 'react';
import KorsaPortfolio from '../components/KorsaPortfolio';

const Home: NextPage = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <KorsaPortfolio />;
};

export default Home;
