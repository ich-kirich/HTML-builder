import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { open, readFile, writeFile, appendFile, } from 'fs';
import path from "node:path";

try {
  const projectFolder = new URL('project-dist/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });
  console.log("Folder project-dist created!")
  mkdir('06-build-page/project-dist/', {recursive: true}, (err) => {if(err) throw err})
}  
catch (err) {
  console.error(err.message);
} // очищение и создание папки

var pathIndex = path.join('06-build-page', 'project-dist', 'index.html')
open(pathIndex, 'w', (err) => {
  if(err) throw err;
  console.log('index.html created');
}); // создание index.html

var filePath = path.resolve('components');
filePath = path.join('06-build-page', 'components')
const files = await readdir(filePath,{ withFileTypes: true });

let pathTemplate = path.join('06-build-page', 'template.html')

readFile(pathTemplate, 'utf8', function(err, content){
  if(err){
    console.log(err);
  }
  else{
    for (const file of files){
      if(file.isFile()){
        let pathTemp = path.resolve(file.name); 
        pathTemp = path.join('06-build-page', 'components', file.name)
        readFile(pathTemp, 'utf8', function(err, data){
          if(err){
             console.log(err);
          }
          let fileName = file.name.split('.')[0];
          content = content.replace(`{{${fileName}}}`, data);
          writeFile(pathIndex, content, (err) => {
            if(err) throw err;
          });
        });
      }
    }
  }
});

var filesCss = path.resolve('styles');
var pathMainCss = path.join('06-build-page', 'project-dist', 'style.css')
filesCss = path.join('06-build-page', 'styles')
const fileCss = await readdir(filesCss,{ withFileTypes: true });

open(pathMainCss, 'w', (err) => {
  if(err) throw err;
  console.log('style.css created');
}); // создание style.css

for (const file of fileCss){
  if(file.isFile()){
    let pathTemp = path.resolve(file.name); 
    pathTemp = path.join('06-build-page', 'styles', file.name)
    let fileType = path.extname(file.name).slice(1);
    if(fileType === "css"){
      readFile(pathTemp, 'utf8', function(err, data){
        if(err){
           console.log(err);
        }else{
          data = data + '\n'
          appendFile(pathMainCss, data, (err) => {
            if(err) throw err;
          });
        }
      });
    }
  }
}

try {
  let projectFolder1 = new URL('project-dist/assets', import.meta.url);
  let createDir1 = await mkdir(projectFolder1, { recursive: true });
  console.log("Folder assets created!")
} 
catch (err) {
  console.error(err.message);
} // очищение и создание папки

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  let entries = await readdir(src, { withFileTypes: true });
  for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);
      entry.isDirectory() ?
          await copyDir(srcPath, destPath) :
          await copyFile(srcPath, destPath);
  }
} // копирование папки assets

copyDir('06-build-page/assets', '06-build-page/project-dist/assets');

