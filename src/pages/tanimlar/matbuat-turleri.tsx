import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function MatbuatTurleri() {
  return <>MatbuatTurleri</>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
