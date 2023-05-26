import { INavItem } from './navMenuItems';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

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
  const { name, slug, subItems, icon } = navItemProps;
  const [open, setOpen] = useState(false);
  return (
    <div className='flex'>
      <Disclosure as='div' className='w-44'>
        <Disclosure.Button
          className={`${navItemStyles} ${
            isActive
              ? 'bg-blue-50 text-blue-800 hover:bg-blue-50 hover:text-blue-800'
              : 'hover:text-gray-600'
          }`}
        >
          <div className='flex items-center gap-4'>
            {icon ? icon(5) : null}
            <span>{name}</span>
          </div>
          <ChevronUpIcon
            className={`${
              open ? 'rotate-180 transform' : ''
            } h-5 w-5 text-slate-500`}
          />
        </Disclosure.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform opacity-0'
          enterTo='transform opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform opacity-100'
          leaveTo='transform opacity-0'
        >
          <Disclosure.Panel className='flex flex-col gap-1 px-2 py-2 text-sm font-medium text-slate-400'>
            <div>
              {subItems?.map((subItem) => {
                const isChildActive = subItem.slug === activeChildSlug;
                return (
                  <Link href={`/${slug}/${subItem.slug}`} key={subItem.slug}>
                    <button
                      disabled={isChildActive}
                      className={`w-full rounded-md px-4 py-1 text-left hover:bg-slate-50 hover:text-gray-700 ${
                        isChildActive &&
                        ' bg-blue-50 text-blue-800 disabled:cursor-auto disabled:hover:bg-blue-50 disabled:hover:text-blue-800'
                      }`}
                    >
                      {subItem.name}
                    </button>
                  </Link>
                );
              })}
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
}
