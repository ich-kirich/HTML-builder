import path from "node:path";
import { readdir } from 'node:fs/promises';
import { open, readFile, appendFile } from 'fs';

var filePath = path.resolve('styles');
var pathMainCss = path.join('05-merge-styles', 'project-dist', 'bundle.css')
filePath = path.join('05-merge-styles', 'styles')
const files = await readdir(filePath,{ withFileTypes: true });

open(pathMainCss, 'w', (err) => {
  if(err) throw err;
  console.log('File created');
});

for (const file of files){
  if(file.isFile()){
    let pathTemp = path.resolve(file.name); 
    pathTemp = path.join('05-merge-styles', 'styles', file.name)
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
console.log("Styles merged")