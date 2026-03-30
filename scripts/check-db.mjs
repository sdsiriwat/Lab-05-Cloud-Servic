import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function check(name) {
  const connectionString = process.env[name];
  const client = new Client({ connectionString });

  try {
    await client.connect();
    const info = await client.query("select current_database() as db, current_user as usr");
    const tables = await client.query("select table_name from information_schema.tables where table_schema='public' order by table_name");
    console.log(name, info.rows[0], tables.rows.map((r) => r.table_name));
  } catch (error) {
    console.error(name, 'ERR', error.message);
  } finally {
    await client.end().catch(() => {});
  }
}

await check('DATABASE_URL');
await check('DIRECT_URL');
