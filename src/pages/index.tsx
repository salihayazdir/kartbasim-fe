import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import authControl from '@/utils/authControl';

export default function Home() {
  return <>dashboard</>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
