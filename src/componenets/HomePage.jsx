import Head from 'next/head';
import { Shampoo } from './Shampoo';

export const HomePage = (props) => {
  const { shampoos } = props;
  return (
    <>
      <div>
        <Head>
          <title>Shampoo Data</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Shampoo Data</h1>
          <p>We have data about shampoo.</p>

          <input className="search" type="text" value="search placeholder..." />

          <ul className="shampoos">
            {shampoos.map((shampoo) => (
              <li>
                <Shampoo key={shampoo.id} {...shampoo} />
              </li>
            ))}
          </ul>
        </main>
      </div>

      <style jsx>{`
        .shampoos {
          list-style-type: none;
        }
        ol,
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          margin-bottom: 0.75rem;
        }

        .search {
          margin: 1.5rem 0;
        }
      `}</style>
    </>
  );
};
