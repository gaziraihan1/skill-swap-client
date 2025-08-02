'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.replace('/dashboard/admin');
      } else {
        router.replace('/dashboard/user');
      }
    }
  }, [user, router]);

  return <p className="text-center mt-20 text-gray-600">Redirecting to your dashboard...</p>;
}
