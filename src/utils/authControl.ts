import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import axios from 'axios';

export default async function authControl(context: GetServerSidePropsContext) {
  try {
    if (!context.req.headers.cookie)
      return {
        redirect: {
          permanent: false,
          destination: '/giris',
        },
      };

    const cookies = cookie.parse(context.req.headers.cookie);
    const { Authorization: accessToken, 'x-refresh': refreshToken } = cookies;

    if (!accessToken || !refreshToken)
      return {
        redirect: {
          permanent: false,
          destination: '/giris',
        },
      };

    const meRequest = await axios
      .get('/api/users/me', {
        headers: {
          Authorization: accessToken,
        },
      })
      .catch((err) => console.error(err.data));

    if (!meRequest?.data.data)
      return {
        redirect: {
          permanent: false,
          destination: '/giris',
        },
      };

    return {
      props: { user: meRequest.data.data },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
}
