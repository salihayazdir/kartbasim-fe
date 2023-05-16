import { navMenuItems, INavItem } from './navigation/navMenuItems';
import NavItemWithSub from './navigation/NavItemWithSub';
import NavItem from './navigation/NavItem';
import type { PageProps } from '@/utils/useCurrentPageProps';

type SidebarProps = {
  currentPageProps: PageProps;
};

export default function Sidebar({ currentPageProps }: SidebarProps) {
  const navItemStyles =
    'flex justify-between w-full hover:bg-slate-50  cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-semibold';

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col gap-8 border-slate-200 px-4 py-6 shadow-lg'>
        <div>LOGO</div>
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
    </div>
  );
}
