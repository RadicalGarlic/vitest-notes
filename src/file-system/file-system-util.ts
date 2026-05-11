import * as fsPromises from 'node:fs/promises';

export async function getFileLen(filePath:string): Promise<number> {
  return (await fsPromises.lstat(filePath)).size;
}
