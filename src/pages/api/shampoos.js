import { listShampoos } from '../../store/listShampoos';

export default async (req, res) => {
  const data = await listShampoos();
  res.statusCode = 200;
  res.json({ data });
};
