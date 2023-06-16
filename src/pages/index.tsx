import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import authControl from '@/utils/authControl';
import useSetUserContext from '@/utils/useSetUserContext';
import { PageProps } from '@/data/models/props';

export default function Home({ user }: PageProps) {
  useSetUserContext(user);
  return <>dashboard</>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
