import { MenuItem } from './menuItems';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export interface MenuItemWithSubProps {
  menuItem: MenuItem;
}

export default function MenuItemWithSub(props: MenuItemWithSubProps) {
  const { name, slug, subItems } = props.menuItem;
  return (
    <Disclosure as='div'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium'>
            <span>{name}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-gray-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='flex flex-col gap-2 px-4 py-2 text-sm text-gray-500'>
            {subItems?.map((subItem) => {
              return <div key={subItem.slug}>{subItem.name}</div>;
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
