import fs from 'node:fs'

import { S3Upload } from './aws'

async function getFileNameAndBuffered(image, folder) {
  const ext = image.name.split('.').pop();
  return {
    fileName: `/${folder}/${Date.now()}.${ext}`,
    bufferedImage: await image.arrayBuffer()
  }

}
export async function SaveFileToDir(image, folder) {
  const {
    fileName,
    bufferedImage
  } = getFileNameAndBuffered(image, folder)
  const stream = fs.createWriteStream(`public${fileName}`);
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error(error)
      throw new Error('Saving image failed');
    }
  });
  return fileName;
}

export async function SaveFileToS3(image, folder) {
  const {
    fileName,
    bufferedImage
  } = getFileNameAndBuffered(image, folder)
  const result = await S3Upload({
    fileName,
    file: bufferedImage,
    type: image.type
  });
  console.log(result)
  return fileName;
}


export function Validate(obj, key) {
  if (!obj[key] || obj[key].trim() === '') {
    throw new Error(`${key} is required`)
  }
}
