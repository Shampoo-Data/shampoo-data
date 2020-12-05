import { HomePage } from '../componenets/HomePage';
import { listShampoos } from '../store/listShampoos';

export default function Home(props) {
  return <HomePage {...props} />;
}

export async function getServerSideProps(context) {
  const shampoos = await listShampoos();

  return {
    props: {
      shampoos,
    },
  };
}
