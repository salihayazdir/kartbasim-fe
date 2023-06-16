import { useEffect, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { User } from '@/data/models/entityModels';
import { axiosProtected } from './axiosInstances';
import { useRouter } from 'next/router';

export default function useSetUserContext(user?: User) {
  const { userContext, setUserContext } = useContext(AppContext);

  useEffect(() => {
    if (userContext) return;

    if (user) setUserContext(user);
    axiosProtected
      .get('/api/users/me')
      .then((res) => {
        setUserContext(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
        const router = useRouter();
        router.reload();
      });
  }, []);
}
