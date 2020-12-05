import Head from 'next/head';
import { Shampoo } from './Shampoo';

export const HomePage = (props) => {
  const { shampoos } = props;
  return (
    <div>
      <Head>
        <title>Shampoo Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shampoo Data</h1>

        <p>This sure is a home page</p>

        <ul>
          {shampoos.map((shampoo) => (
            <li>
              <Shampoo key={shampoo.id} {...shampoo} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
