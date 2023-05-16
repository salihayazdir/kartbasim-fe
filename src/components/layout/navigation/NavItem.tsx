import { INavItem } from './navMenuItems';
import Link from 'next/link';

export interface NavItemProps {
  navItemProps: INavItem;
  navItemStyles: string;
  isActive: boolean;
}

export default function NavItem({
  navItemProps,
  navItemStyles,
  isActive,
}: NavItemProps) {
  const { name, slug, icon } = navItemProps;
  return (
    <Link href={`/${slug}`}>
      <button
        disabled={isActive}
        className={`${navItemStyles} hover:text-gray-600 ${
          isActive &&
          'disabled:cursor-auto disabled:bg-blue-50 disabled:text-blue-800 disabled:hover:bg-blue-50 disabled:hover:text-blue-800'
        }`}
      >
        <div className='flex items-center justify-center gap-4'>
          {icon ? icon(5) : null}
          <span>{name}</span>
        </div>
        <span></span>
      </button>
    </Link>
  );
}
