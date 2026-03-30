import {S3Client} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: "23cd1978b733d3e82ccc090d90cbcb57",
    secretAccessKey:
      "ec05289219082117e95676c37d8fd073e6518e0a6c749b0c60121d96b034b4ce"
  },
  endpoint: "https://ofdnlbbfkdypmchpfolp.storage.supabase.co/storage/v1/s3",
  region: "ap-northeast-1",
  forcePathStyle: true
  
});

export default s3Client;
