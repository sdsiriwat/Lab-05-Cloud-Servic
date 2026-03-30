import 'dotenv/config';
import { getAllEventsWithOrganizer } from '../src/repositories/EventRepositoryPrisma';

async function main() {
  const events = await getAllEventsWithOrganizer();
  console.log('events count:', events.length);
  console.log(events.slice(0, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
