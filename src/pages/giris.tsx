import { useState } from 'react';
import DialogResponseMessages from '@/components/dialog/DialogResponseMessages';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { useRouter } from 'next/router';

export default function Giris() {
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginStep, setLoginStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<{
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
  }>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  });

  const router = useRouter();

  const { isError, isLoading, isSuccess, errorMessage } = apiStatus;

  const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiStatus({
      isLoading: true,
      isError: false,
      isSuccess: false,
      errorMessage: '',
    });
    axios
      .post('/api/auth/login', { username: loginUsername })
      .then((res) => {
        setLoginStep(2);
        setApiStatus({
          isLoading: false,
          isError: false,
          isSuccess: true,
          errorMessage: '',
        });
      })
      .catch((err) => {
        // console.error(err);
        setApiStatus({
          isLoading: false,
          isError: true,
          isSuccess: false,
          errorMessage:
            err.response?.data?.error?.message?.toString() ||
            'Bir hata meydana geldi.',
        });
      });
  };

  const handleOtpFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiStatus({
      isLoading: true,
      isError: false,
      isSuccess: false,
      errorMessage: '',
    });
    axios
      .post(
        '/api/auth/session',
        { username: loginUsername, otp },
        { withCredentials: true }
      )
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        // console.error(err);
        setApiStatus({
          isLoading: false,
          isError: true,
          isSuccess: false,
          errorMessage:
            err.response?.data?.error?.message?.toString() ||
            'Bir hata meydana geldi.',
        });
      });
  };

  return (
    <>
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12'>
        <div className='border-gray-200pt-8 flex w-full max-w-md flex-col rounded-xl border bg-white '>
          <h2 className=' border-b border-gray-200 py-4 text-center text-xl font-bold tracking-tight text-gray-700'>
            Kullanıcı Girişi
          </h2>
          <div className='flex rounded-md text-center text-sm font-semibold text-gray-300 '>
            <div
              className={`flex-1 border-b py-4 ${
                loginStep === 1 && ' border-b-2 border-blue-300 text-blue-300 '
              } `}
            >
              <h3>1. Kullanıcı Adı</h3>
            </div>
            <div
              className={`flex-1  border-b py-4 ${
                loginStep === 2 && 'border-b-2 border-green-400 text-green-400'
              } `}
            >
              <h3>2. Doğrulama Kodu</h3>
            </div>
          </div>
          <div className='flex flex-col gap-10 p-10'>
            <DialogResponseMessages
              isError={isError}
              isSuccess={isSuccess}
              isLoading={isLoading}
              errorMessage={errorMessage}
              successMessage={`Doğrulama kodu e-posta adresinize gönderildi.`}
            />
            {loginStep === 1 && (
              <form onSubmit={handleLoginFormSubmit} className='flex flex-col '>
                <div className='relative rounded-md '>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    required
                    disabled={isLoading}
                    pattern='^[A-Za-z]{5,7}$'
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className='peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0 disabled:text-gray-500 '
                    placeholder=' '
                  />
                  <label
                    htmlFor='username'
                    className='absolute left-2 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500 '
                  >
                    Kullanıcı Adınız
                  </label>
                </div>
                <p className='mt-2 text-xs text-gray-400'>
                  6 harften oluşan Bileşim kullanıcı adınız.
                </p>
                <button
                  type='submit'
                  disabled={apiStatus.isLoading}
                  className={`mt-6 flex justify-center rounded-lg bg-blue-700 px-6 py-4 text-sm  font-semibold text-white hover:bg-blue-800 disabled:bg-gray-400`}
                >
                  Gönder
                </button>
              </form>
            )}

            {loginStep === 2 && (
              <form className='flex flex-col' onSubmit={handleOtpFormSubmit}>
                <div className='relative rounded-md '>
                  <input
                    id='otp'
                    name='otp'
                    type='text'
                    required
                    disabled={isLoading}
                    pattern='^[0-9]{6}$'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className='peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0'
                    placeholder=' '
                  />
                  <label
                    htmlFor='otp'
                    className='absolute left-2 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-500 '
                  >
                    Doğrulama Kodunuz
                  </label>
                </div>
                <p className='mt-2 text-xs text-gray-400'>
                  Mail adresinize gönderilmiş olan 6 haneli doğrulama kodu.
                </p>
                <button
                  type='submit'
                  disabled={apiStatus.isLoading}
                  className={`mt-6 flex justify-center rounded-lg bg-green-700 px-6 py-4 text-sm  font-semibold text-white hover:bg-green-800 disabled:bg-gray-400`}
                >
                  Giriş Yap
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    if (!context.req.headers.cookie)
      return {
        props: {},
      };

    const cookies = cookie.parse(context.req.headers.cookie);
    const { Authorization: accessToken, 'x-refresh': refreshToken } = cookies;

    const meRequest = await axios
      .get('/api/users/me', {
        headers: {
          Authorization: accessToken,
        },
      })
      .catch((err) => console.error(err?.response?.data?.error));

    if (meRequest?.data.data)
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
};
