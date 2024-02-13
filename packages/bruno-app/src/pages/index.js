import Head from 'next/head';
import Bruno from './Bruno';
import GlobalStyle from '../globalStyles';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Çakıl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />

      <main>
        <Bruno />
      </main>
    </div>
  );
}
