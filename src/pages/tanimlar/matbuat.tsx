import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Matbuat() {
  return <>Matbuat</>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
