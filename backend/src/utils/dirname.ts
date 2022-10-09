import { dirname as pathdirname } from 'path';
import { fileURLToPath } from 'url';

export default (url: string) => {
  return pathdirname(fileURLToPath(url));
}