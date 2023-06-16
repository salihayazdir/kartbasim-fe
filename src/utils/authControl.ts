import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import {
  axiosProtectedServerSide,
  axiosPublicServerSide,
} from './axiosInstances';

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
    const { Authorization: accessToken, refresh: refreshToken } = cookies;

    try {
      const meRequest = await axiosProtectedServerSide.get('/api/users/me', {
        headers: {
          Authorization: accessToken ?? '',
          refresh: refreshToken ?? '',
        },
      });
      if (meRequest?.data.data)
        return {
          props: { user: meRequest.data.data },
        };
    } catch (meRequestError: any) {
      if (meRequestError.response.status) {
        try {
          const refreshRequest = await axiosPublicServerSide.get(
            '/api/auth/refresh',
            {
              headers: {
                refresh: refreshToken ?? '',
              },
            }
          );

          if (refreshRequest?.data?.data?.accessToken) {
            context.res.setHeader(
              'set-cookie',
              `Authorization = Bearer%20${refreshRequest?.data?.data?.accessToken}`
            );
            return {
              props: {},
            };
          }
        } catch (refreshRequestError) {
          return {
            redirect: {
              permanent: false,
              destination: '/giris',
            },
          };
        }
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: '/giris',
      },
    };
  } catch (err: any) {
    console.error(err);
    return {
      redirect: {
        permanent: false,
        destination: '/giris',
      },
    };
  }
}

// export default async function authControl(context: GetServerSidePropsContext) {
//   try {
//     if (!context.req.headers.cookie)
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/giris',
//         },
//       };

//     const cookies = cookie.parse(context.req.headers.cookie);
//     const { Authorization: accessToken, refresh: refreshToken } = cookies;

//     if (!accessToken || !refreshToken)
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/giris',
//         },
//       };

//     const meRequest = await axiosProtected
//       .get('/api/users/me', {
//         headers: {
//           Authorization: accessToken,
//         },
//       })
//       .catch((err) => {
//         console.error(err?.response?.data?.error);
//         if (err.response.status === 401) {
//           axiosPublic
//             .get('/api/auth/refresh', { withCredentials: true })
//             .catch((refreshError) => {
//               return Promise.reject(refreshError);
//             });
//         }
//       });

//     if (!meRequest?.data.data)
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/giris',
//         },
//       };

//     return {
//       props: { user: meRequest.data.data },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/giris',
//       },
//     };
//   }
// }
