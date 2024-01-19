import { S3 } from '@aws-sdk/client-s3';
const s3 = new S3({
  region: 'us-east-1'
});
export function S3Upload({fileName, file, type}) {
  return s3.putObject({
    Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
    Key: fileName,
    Body:  Buffer.from(file),
    ContentType: type,
  });
}
