import { readdir, mkdir, unlink } from 'node:fs/promises';
import { resolve, join } from 'path';
import { copyFile } from 'node:fs';

async function copyDir(){

  var filePath = resolve('files'); 
  filePath = join('04-copy-directory', 'files')

  try {
    const projectFolder = new URL('files-copy/', import.meta.url);
    const createDir = await mkdir(projectFolder, { recursive: true });
    console.log("Folder created!")
    for (const file of await readdir('04-copy-directory/files-copy')) {
      await unlink(join('04-copy-directory/files-copy', file));
    }
  }  
  catch (err) {
    console.error(err.message);
  } // очищение и создание папки

  try{
    const files = await readdir(filePath,{ withFileTypes: true });
    for (const file of files){
      if(file.isFile()){
        let path = resolve(file.name); 
        path = join('04-copy-directory', 'files', file.name)
        let newPath = resolve(file.name);
        newPath = join('04-copy-directory', 'files-copy', file.name)
        copyFile(path, newPath, (err) => {
          if(err) throw err; // не удалось скопировать файл
          console.log('File copied successfully');
        });
      }
    }
  }
  catch (err) {
    console.error(err);
  }
  
}

copyDir();