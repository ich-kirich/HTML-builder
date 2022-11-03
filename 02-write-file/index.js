import { createWriteStream } from 'fs';
import { resolve, join } from 'path';
const { stdin } = process;

var filePath = resolve('text.txt'); 
filePath = join('02-write-file', 'text.txt')

const output = createWriteStream(filePath, 'utf-8');
console.log("Hi, write the text you want to add to the file\n")

stdin.on('data', (content) => {
    if (content.toString().trim() === 'exit') {
        process.exit();
    }
    output.write(content);
});

process.on('exit', () => console.log('\nThe program has ended'));
process.on('SIGINT', () => process.exit());