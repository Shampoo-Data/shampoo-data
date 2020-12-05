import Head from 'next/head';

export const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Shampoo Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shampoo Data</h1>

        <p>This sure is a home page</p>
      </main>
    </div>
  );
};
