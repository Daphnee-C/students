import chalk from 'chalk';
import http from 'http';
import { writeFile, readFile } from 'fs';
import axios from 'axios';

console.log(chalk.red('Galys'));
console.log(chalk.green('Coralie'));
console.log(chalk.blue('David'));
console.log(chalk.yellow('Lucie'));

const PORT = 8000;
const HOST = 'localhost';

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Welcome to my first HTTP server</h1>');
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);

    writeFile('greeting.txt', 'Hello from Node.js!', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File written successfully: greeting.txt');

        readFile('greeting.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            console.log('File content:', data);
            
            axios.get('http://www.google.com')
                .then(response => {
                    writeFile('google.html', response.data, (err) => {
                        if (err) {
                            console.error('Error writing google.html:', err);
                            return;
                        }
                        console.log('google.html saved successfully');
                    });
                })
                .catch(error => {
                    console.error('Error fetching Google:', error);
                });
        });
    });
});
