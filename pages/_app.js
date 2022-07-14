import { Provider } from 'next-auth/client';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
