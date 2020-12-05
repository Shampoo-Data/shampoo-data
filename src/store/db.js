import { createPool } from 'slonik';

export const pool = createPool(process.env.DATABASE_URL);
