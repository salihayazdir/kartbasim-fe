import React, { PropsWithChildren, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

type DialogWrapperProps = {
  title: string;
  description?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseAction?: () => void;
};

export default function DialogWrapper({
  title,
  description,
  children,
  open,
  setOpen,
  onCloseAction,
}: PropsWithChildren<DialogWrapperProps>) {
  const onClose = () => {
    setOpen(false);
    if (onCloseAction !== undefined) onCloseAction();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className='fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm'
    >
      <Dialog.Overlay
        as='div'
        className='flex min-h-screen items-center justify-center'
      >
        <div className='pointer-events-none fixed inset-0 bg-slate-500 opacity-40 ' />
        <div className='relative mx-auto my-16 w-[90vw] max-w-[450px] rounded-xl bg-white shadow-2xl '>
          <Dialog.Title className='flex justify-between border-b border-slate-200 py-4 pl-8 pr-4 font-semibold text-slate-800'>
            <span>{title}</span>
            <button
              className='inline-flex h-6 w-6 appearance-none items-center justify-center rounded-md transition-all hover:bg-slate-100 focus:outline-none'
              aria-label='Close'
              onClick={onClose}
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
          </Dialog.Title>
          <div className='p-8 pt-4'>{children}</div>
        </div>
      </Dialog.Overlay>
    </Dialog>
  );
}
