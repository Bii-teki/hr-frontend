'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/context/AuthContext';

export const RouteGuard = ({ children, requireAuth = true, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      router.replace('/login');
    } else if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
      router.replace('/unauthorized');
    }
  }, [loading, user]);

  if (requireAuth && (loading || !user)) return <div className="text-center p-8">Loading...</div>;

  return children;
};
