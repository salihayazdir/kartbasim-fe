import SpinningLoader from '../placeholders/SpinningLoader';

type DialogResponseMessagesProps = {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
};

export default function DialogResponseMessages({
  isError,
  isSuccess,
  isLoading,
  successMessage,
  errorMessage,
}: DialogResponseMessagesProps) {
  const constructMessage = (): string | null => {
    if (isError) {
      if (errorMessage === null) return 'Bir hata meydana geldi.';
      return errorMessage;
    }

    if (isSuccess) return successMessage;

    return null;
  };

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <SpinningLoader size={30} />
      </div>
    );

  if (constructMessage() === null) return <></>;

  return (
    <div
      className={`rounded-md p-3 font-medium ${
        isError ? ' bg-red-50 text-red-700' : null
      } ${isSuccess ? ' bg-green-50 text-green-700' : null}`}
    >
      {constructMessage()}
    </div>
  );
}
