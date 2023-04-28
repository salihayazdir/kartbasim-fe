import { INavItem } from './navMenuItems';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';

export interface NavItemWithSubProps {
  navItemProps: INavItem;
  navItemStyles: string;
  isActive: boolean;
  activeChildSlug: string;
}

export default function NavItemWithSub({
  navItemProps,
  navItemStyles,
  isActive,
  activeChildSlug,
}: NavItemWithSubProps) {
  const { name, slug, subItems } = navItemProps;
  const [open, setOpen] = useState(false);
  return (
    <div className='flex'>
      <Collapsible.Root className='w-44' open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger
          className={`${navItemStyles} ${isActive && 'text-red-500'}`}
        >
          <span>{name}</span>
          <ChevronUpIcon
            className={`${
              open ? 'rotate-180 transform' : ''
            } h-5 w-5 text-gray-500`}
          />
        </Collapsible.Trigger>
        <Collapsible.Content
          asChild
          className='flex flex-col gap-3 px-4 py-2 text-sm text-gray-500'
        >
          <div>
            {subItems?.map((subItem) => {
              const isChildActive = subItem.slug === activeChildSlug;
              return (
                <Link
                  href={`/${slug}/${subItem.slug}`}
                  key={subItem.slug}
                  className={`${isChildActive && 'text-red-500'}`}
                >
                  {subItem.name}
                </Link>
              );
            })}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
