import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function StokYonetimiKasalar() {
  return <>StokYonetimi/Kasalar</>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
