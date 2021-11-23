import { createConnection, getConnectionOptions } from 'typeorm';

async function connection() {
  const options = await getConnectionOptions();
  console.log(options);
  await createConnection({
    ...options,
    extra: { ssl: { rejectUnauthorized: false } },
  });
}
connection();
