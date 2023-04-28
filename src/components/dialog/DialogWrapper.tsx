import { PropsWithChildren } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { JsxElement } from 'typescript';

type DialogWrapperProps = {
  title: string;
  description?: string;
  trigger: React.ReactNode;
};

export default function DialogWrapper({
  title,
  description,
  trigger,
  children,
}: PropsWithChildren<DialogWrapperProps>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <Dialog.Title className='m-0 text-[17px] font-medium text-mauve12'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-5 mt-[10px] text-[15px] leading-normal text-mauve11'>
            {description}
          </Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button
              className='absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none'
              aria-label='Close'
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
