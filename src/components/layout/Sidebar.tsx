import { navMenuItems, INavItem } from './navigation/navMenuItems';
import NavItemWithSub from './navigation/NavItemWithSub';
import NavItem from './navigation/NavItem';
import type { PageProps } from '@/utils/useCurrentPageProps';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import {
  ArrowLeftOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { axiosPublic } from '@/utils/axiosInstances';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoadingDots from '../placeholders/loadingDots/LoadingDots';

type SidebarProps = {
  currentPageProps: PageProps;
};

export default function Sidebar({ currentPageProps }: SidebarProps) {
  const { userContext } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    setLoading(true);
    axiosPublic.get('/api/auth/logout').finally(() => {
      Cookies.remove('Authorization');
      Cookies.remove('refresh');
      setLoading(false);
      router.reload();
    });
  };

  const navItemStyles =
    'flex justify-between w-full hover:bg-slate-50  cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-semibold';

  return (
    <div className='flex min-h-screen'>
      <div className='flex w-52  flex-col justify-between shadow-lg'>
        <div className='flex flex-col gap-8 px-4 pb-20 pt-6 '>
          <div className='pl-2'>
            <Image
              src='/bilesimLogo.png'
              alt='Bileşim Logo'
              width='132'
              height='33'
            />
          </div>
          <nav className='flex flex-col gap-4 text-gray-400 '>
            {navMenuItems.map((item: INavItem) => {
              if (item.subItems) {
                return (
                  <NavItemWithSub
                    key={item.slug}
                    navItemProps={item}
                    navItemStyles={navItemStyles}
                    isActive={currentPageProps.parentSlug === item.slug}
                    activeChildSlug={currentPageProps.slug}
                  />
                );
              } else {
                return (
                  <NavItem
                    key={item.slug}
                    navItemProps={item}
                    navItemStyles={navItemStyles}
                    isActive={currentPageProps.slug === item.slug}
                  />
                );
              }
            })}
          </nav>
        </div>
        <div className='sticky bottom-0 flex w-52 items-center justify-between border-t border-slate-200 bg-white py-3 pl-4 pr-2 text-xs text-slate-400 transition-all hover:text-slate-900'>
          <div className='flex items-center gap-2'>
            <UserIcon className='h-4 w-4 ' />
            <span>{userContext?.name}</span>
          </div>
          <div className='group'>
            <span
              className={`absolute z-50 -ml-4 -mt-8 w-16 whitespace-nowrap rounded bg-slate-600 px-2 py-1 text-center text-gray-100 transition-all group-hover:block ${
                loading ? 'block' : 'hidden'
              }`}
            >
              {loading ? <LoadingDots color='white' /> : <span>Çıkış Yap</span>}
            </span>
            <button
              onClick={handleLogout}
              className='rounded-md px-1.5 py-1 transition-all hover:bg-red-50  hover:text-red-600'
            >
              <ArrowLeftOnRectangleIcon className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
