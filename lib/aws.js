import { S3, S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const S3_CLOUD_FRONT = 'https://dqc65nwcqwvpl.cloudfront.net/'
const S3_URL = 'https://starbazaarpublicbucket.s3.us-east-1.amazonaws.com/'
const s3 = new S3({
  region: process.env['AWS_REGION'],
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  bucketName: process.env['AWS_BUCKET_NAME']
});
export async function S3Upload({ fileName, file, type }) {
  return s3.putObject({
    Bucket: process.env['AWS_BUCKET_NAME'],
    Key: fileName,
    Body: Buffer.from(file),
    ContentType: type,
  });
}

const s3Client = new S3Client(
  {
    credentials: {
      accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    },
    region: process.env['AWS_REGION'],
  }
);
// const options = {
//   queueSize: 360000,
//   partSize: 52428800000
// }


export async function AWS_BUCKET({ fileName, file, type }) {
  const params = {
    Key: fileName,
    Body: file,
    ContentType: type,
    Bucket: process.env['AWS_BUCKET_NAME'],
    maxRetries: 10,
    ACL: 'public-read',
    // queueSize: 360000,
    // partSize: 52428800000
    // UploadId: '123ASDFASDFESSDF',
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params))
    return {
      ...data,
      Location: S3_CLOUD_FRONT + fileName
    };
  } catch (e) {
    console.error({aws_bucket_failed: e})
  }
}