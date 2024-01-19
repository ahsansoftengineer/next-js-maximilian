import fs from 'node:fs'

import { S3Upload, AWS_BUCKET } from './aws'

async function getFileNameAndBuffered(image, folder) {
  const ext = image.name.split('.').pop();
  return {
    fileName: `${folder}/${Date.now()}.${ext}`,
    bufferedImage: await image.arrayBuffer()
  }

}
export async function SaveFileToDir(image, folder) {
  const {
    fileName,
    bufferedImage
  } = await getFileNameAndBuffered(image, folder)
  const stream = fs.createWriteStream(`public/${fileName}`);
  try{
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        console.error(error)
        throw new Error('Saving image failed');
      }
    });
    return {Location: '/'+ fileName};
  }catch(e){
    console.error({FileSystem_Error: err}) 
    return {}
  }
 
}

export async function SaveFileToS3(image, folder) {
  const {
    fileName,
    bufferedImage
  } = await getFileNameAndBuffered(image, folder)
  try{
    const result = await AWS_BUCKET({
      fileName,
      file: bufferedImage,
      type: image.type
    });
    return result.Location
  }catch(err) {
    console.error({AWS_Error: err}) 
    return {}
  }
 

  return 'https://dqc65nwcqwvpl.cloudfront.net' + fileName;
}


export function Validate(obj, key) {
  if (!obj[key] || obj[key].trim() === '') {
    throw new Error(`${key} is required`)
  }
}
