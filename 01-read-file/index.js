import { ReadStream } from 'fs';
import { resolve, join } from 'path';

var filePath = resolve('text.txt') 
filePath = join('01-read-file', 'text.txt')
var stream = new ReadStream(filePath, {encoding: 'utf-8'});
 
stream.on('readable', function(){
    var content = stream.read();
    if(content != null){
        console.log(content);
    }
});