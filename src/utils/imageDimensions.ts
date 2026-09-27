import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { imageMetadata } from 'astro/assets/utils';

// Read dimensions at build time only; public images are not transformed.
export async function imageDimensions(src: string) {
  const { width, height } = await imageMetadata(await readFile(path.join(process.cwd(), 'public', src)), src);
  return { width, height };
}
