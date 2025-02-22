'use client';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const router = useRouter();
  useEffect(() => {
      const isLoggedIn = localStorage.getItem('token');
      if (!isLoggedIn) {
        router.push('/admin');
      }
  }, [router]);
    return (
    <div>
        {children}
    </div>
  )
}
