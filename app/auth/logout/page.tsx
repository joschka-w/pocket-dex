'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Logout() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/auth/login');
    }, 2000);
  }, [router]);

  return <div className="mt-12 font-medium">You have been logged out. redirecting...</div>;
}

export default Logout;
