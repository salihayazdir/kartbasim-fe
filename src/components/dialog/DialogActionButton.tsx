import React from 'react';

interface DialogActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSuccess: boolean;
  closeButtonOnClick?: () => void;
}

export default function DialogActionButton({
  isSuccess,
  closeButtonOnClick,
  children,
  ...props
}: React.PropsWithChildren<DialogActionButtonProps>) {
  if (isSuccess)
    return (
      <button
        onClick={closeButtonOnClick}
        disabled={props.disabled}
        className='rounded-lg bg-gray-600 px-6 py-3 text-sm  font-medium text-white  transition-all hover:bg-gray-700'
      >
        Tamam
      </button>
    );
  return (
    <button
      className={`${props.className} mt-2 rounded-lg bg-blue-700 px-6 py-3 text-sm  font-semibold text-white transition-all hover:bg-blue-800 disabled:bg-gray-400`}
      {...props}
    >
      {children}
    </button>
  );
}
