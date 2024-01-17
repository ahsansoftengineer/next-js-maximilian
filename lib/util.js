import fs from 'node:fs'

export async function saveFile(image, folder) {
  const extension = image.name.split('.').pop();
  var date_time = Date.now();
  const fileName = `${date_time}.${extension}`;
  const stream = fs.createWriteStream(`public/${folder}/${fileName}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error(error)
      throw new Error('Saving image failed');
    }
  });
  return `/${folder}/${fileName}`;
}
