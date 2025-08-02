import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

export default function useUserRole() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data?.role || '';
    },
  });

  return { role, loading: isLoading };
}
