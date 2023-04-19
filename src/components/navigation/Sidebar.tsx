import { PropsWithChildren } from 'react';
import { navMenuItems, MenuItem } from '../navigation/menuItems';
import MenuItemWithSub from './MenuItemWithSub';

export default function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col gap-8 bg-gray-200 px-8 py-6'>
        <div>LOGO</div>
        <nav className='flex flex-col gap-4'>
          {navMenuItems.map((item: MenuItem) => {
            if (item.subItems) return <MenuItemWithSub menuItem={item} />;
            return (
              <div key={item.slug} className='bg-white px-4 py-2'>
                <div>{item.name}</div>
              </div>
            );
          })}
        </nav>
      </div>
      <main>{children}</main>
    </div>
  );
}
