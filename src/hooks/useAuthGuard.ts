import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { useAuth } from '~/contexts/AuthenticationContext';

function useAuthGuard(): void {
  const router = useRouter();
  const { isAuthenticated, userPreloaded } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && userPreloaded) {
      router.push('/signin');
      toast.success('It must be logged to access this feature.');
    }
  }, [isAuthenticated, router, userPreloaded]);
}

export default useAuthGuard;
