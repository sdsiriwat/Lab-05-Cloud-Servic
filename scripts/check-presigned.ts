import { getPresignedUrl } from '../src/services/UploadFileService';

async function main() {
  const key = process.argv[2];
  if (!key) {
    throw new Error('Missing key arg');
  }
  const url = await getPresignedUrl('images', key, 3600);
  console.log(url);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
