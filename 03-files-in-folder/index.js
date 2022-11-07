import { readdir } from 'node:fs/promises';
import { resolve, join, extname } from 'path';
import { stat } from 'node:fs';

var filePath = resolve('secret-folder'); 
filePath = join('03-files-in-folder', 'secret-folder')

try {
  const files = await readdir(filePath,{ withFileTypes: true });
  for (const file of files){
    if(file.isFile()){
      let path = resolve(file.name); 
      path = join('03-files-in-folder', 'secret-folder', file.name)
      let fileSize;
      let fileName = file.name.split('.')[0];
      let fileType = extname(file.name);
      stat(path, (err, stats) => {
        if(err) throw err;
        fileSize = stats.size
        console.log(fileName + " - " + fileType.slice(1) + " - " + fileSize + " bytes")
      });
    }
  }
} catch (err) {
  console.error(err);
}